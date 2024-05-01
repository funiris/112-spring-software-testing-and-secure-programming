Name: 魏詠芳
ID: 511558024

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 1 min, 3 sec        │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 1 sec        │  total paths : 6      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 10 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 14 sec       │   uniq hangs : 1      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.26 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 1/1           │ favored paths : 1 (16.67%)             │
│ stage execs : 182/224 (81.25%)      │  new edges on : 2 (33.33%)             │
│ total execs : 271                   │ total crashes : 10 (1 unique)          │
│  exec speed : 6.92/sec (zzzz...)    │  total tmouts : 12 (3 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 0/0, 0/0, 0/0                         │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 6          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 5          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
^C────────────────────────────────────────────────────┘          [cpu000:247%]


```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==36713==ERROR: AddressSanitizer: stack-overflow on address 0x7fff06806b68 (pc 0x5c348596f14f bp 0x7fff07004fc0 sp 0x7fff06805b70 T0)
    #0 0x5c348596f14f in main /home/uu/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x74bc3ac29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x74bc3ac29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5c348596fde4 in _start (/home/uu/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2de4)

SUMMARY: AddressSanitizer: stack-overflow /home/uu/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==36713==ABORTING

```
