# lazyMan
This is for a small realistic wechat challenge problem.

# problem description.
```
input:
lazyMan('Hank');
output:
Hi, This is Hank!

input:
lazyMan('Hank').sleep(10).eat('dinner');
output:
Hi, This is Hank!
// wait 10 seconds
Wake up after 10 seconds!;
Eat dinner!

input:
lazyMan('Hank').sleepFirst(10).eat('dinner').eat('supper');
output:
// wait 10 seconds
Wake up after 10 seconds!;
Hi, This is Hank!
Eat dinner!
Eat supper!

```

# Design
lazyMan -> chaining method ( sleep, eat)

lazyMan -> use a queue to maintain the sequence of events, sleep have higher priority

method invocation -> use subscribe and publish design pattern
