---
title: "Redis 学习笔记"
date: "2026-11-09"
tag: "后端"
excerpt: "后端补课的第一站：数据结构、持久化、缓存三件套、分布式锁。本地环境实测 + 面试高频考点整理，持续更新。"
---

Redis 是我补后端的第一站——不只是因为面试高频，而是它把"数据放在内存里到底能玩出什么花样"这个问题回答得最漂亮。这篇笔记边搭本地环境（redis-windows + Another Redis Desktop Manager）边整理，理论和操作互相印证。

## 为什么快

三句话能说清：**内存操作、单线程无锁竞争、IO 多路复用（epoll）**。

注意"单线程"指的是**命令执行是单线程**，Redis 6.0 之后网络 IO 解析是多线程的。面试被问"单线程为什么还快"时，别漏掉 epoll 这条。

## 五大基础数据结构与应用场景

| 类型 | 底层编码 | 典型场景 |
|------|---------|---------|
| String | int / embstr / raw | 缓存、计数器、分布式锁 |
| Hash | listpack / hashtable | 对象存储（用户信息） |
| List | quicklist（listpack 组成） | 消息队列、时间线 |
| Set | intset / hashtable | 去重、共同好友（交并集） |
| ZSet | listpack / skiplist + dict | 排行榜、延迟队列 |

几个值得记住的点：

- **SDS**（简单动态字符串）比 C 字符串多了长度字段和空间预分配，`STRLEN` 是 O(1)，拼接不用反复 `realloc`
- **跳表**：ZSet 的核心。多层链表，查找 O(log n)，实现比红黑树简单，且支持范围查询（这是选它而不是红黑树的关键原因）
- Hash 和 ZSet 在元素少时会用 listpack（7.0 取代了 ziplist）省内存，超过阈值自动转 hashtable/skiplist

本地可以用 `OBJECT ENCODING key` 实际观察编码变化，比背八股有效得多。

## 持久化

**RDB**：定时快照，`save` 阻塞 / `bgsave` fork 子进程写。恢复快、文件小，但**两次快照之间的数据会丢**。

**AOF**：追加写命令日志。写回策略 `everysec`（默认，最多丢 1 秒）是性能与安全的折中。文件大了用 **AOF 重写**（`bgrewriteaof`）压缩，同样 fork 子进程。

**混合持久化**（4.0+，`aof-use-rdb-preamble`）：重写时先写 RDB 头再追加增量 AOF，兼得两者优点，生产推荐。

高频追问：**fork 期间写命令怎么办？** —— 写时复制（COW），父子进程共享物理内存页，有写操作时才真正复制页面。

## 过期删除与内存淘汰

这是两套独立机制，容易混淆：

- **过期删除**（对单个 key）：惰性删除（访问时检查）+ 定期删除（每 100ms 随机抽样清理）
- **内存淘汰**（内存满时，`maxmemory` 触发）：默认 `noeviction` 直接报错；常用 `allkeys-lru` / `volatile-lru`；面试爱问 `allkeys-lfu`（4.0+，用计数近似统计频率）

## 缓存三大问题

后端面试绕不开的三连问，答案要成体系：

| 问题 | 定义 | 解法 |
|------|------|------|
| 缓存穿透 | 查询**不存在**的数据，缓存永远不命中打穿到 DB | 缓存空值（短 TTL）+ 布隆过滤器 |
| 缓存击穿 | 某个**热点 key 过期**瞬间大量请求打到 DB | 互斥锁重建 / 热点 key 永不过期 + 后台刷新 |
| 缓存雪崩 | **大批 key 同时过期**或 Redis 宕机 | 过期时间加随机抖动、集群高可用、限流降级 |

顺着还要会讲**缓存一致性**：Cache Aside 是主流（先更新 DB，再删缓存），能口述"为什么删缓存而不是更新缓存"（并发写会覆盖、懒加载省资源）就够了。

## 分布式锁

`SET key value NX EX seconds` 一条命令完成"不存在才设置 + 带过期时间"，**必须用原子命令，分开写 SETNX + EXPIRE 有中间态风险**。

进阶点：

- value 存唯一标识（UUID），释放锁用 Lua 脚本判断"是我的锁才删"，防止误删别人的锁
- 业务超时锁过期 → 看门狗自动续期（Redisson 的思路）
- 主从切换锁丢失 → Redlock 是争议方案，知道讨论即可；一般业务用单实例锁 + 合理 TTL 已足够

## 本地实验清单

环境：redis-windows + Another Redis Desktop Manager（ARDM 可视化看 key 和编码）。

- [x] 五大类型的增删改查，用 `OBJECT ENCODING` 观察编码切换
- [x] `SET key value NX EX 10` 模拟分布式锁，再用 Lua 脚本释放
- [ ] 修改 `redis.conf` 分别开 RDB / AOF，重启后对比数据恢复情况
- [ ] JMeter / ab 压测一个模拟的缓存击穿场景，加互斥锁前后对比
- [ ] `SLOWLOG GET` 看慢查询，`redis-benchmark` 跑一轮基线性能

## 下一步

- Redis Stream 和消息队列场景（对比 List 的 LPUSH/BRPOP 方案）
- 哨兵（Sentinel）与 Cluster 的脑裂、槽分配机制
- 结合 FastAPI 写一个带缓存层的小项目，把 Cache Aside 真正落地
