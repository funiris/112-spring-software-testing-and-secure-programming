# Answer

Name: 魏詠芳
ID: 511558024

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |     V    |   V  |
| Stack out-of-bounds  |     X    |   V  |
| Global out-of-bounds |     X    |   V  |
| Use-after-free       |     V    |   V  |
| Use-after-return     |     X    |   V  |

### Heap out-of-bounds
#### Source code
```
#include <iostream>

void access_invalid_memory(int* ptr) {
  // Attempt to write data beyond the allocated block
  ptr[100] = 20; // Write to an invalid index beyond the allocated size
  std::cout << "Invalid value: " << ptr[100] << std::endl; // Access the modified value
}

int main() {
  int* ptr = new int; // Allocate memory on the heap
  *ptr = 10; // Store a value in the allocated memory

  // Access invalid memory beyond the allocated block
  access_invalid_memory(ptr);

  // Don't free the allocated memory (potential memory leak)
  // delete ptr;

  return 0;
}

```
#### Valgrind Report
```
// g++ Heap-out-of-bounds.cpp -o Heap-out-of-bounds -lstdc++
// valgrind ./Heap-out-of-bounds

==52814== Memcheck, a memory error detector
==52814== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==52814== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==52814== Command: ./Heap-out-of-bounds
==52814== 
==52814== Invalid write of size 4
==52814==    at 0x109203: access_invalid_memory(int*) (in /home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds)
==52814==    by 0x10927F: main (in /home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds)
==52814==  Address 0x4ddce10 is 320 bytes inside an unallocated block of size 4,121,360 in arena "client"
==52814== 
==52814== Conditional jump or move depends on uninitialised value(s)
==52814==    at 0x4998A4E: std::ostreambuf_iterator<char, std::char_traits<char> > std::num_put<char, std::ostreambuf_iterator<char, std::char_traits<char> > >::_M_insert_int<long>(std::ostreambuf_iterator<char, std::char_traits<char> >, std::ios_base&, char, long) const (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30)
==52814==    by 0x49A7119: std::ostream& std::ostream::_M_insert<long>(long) (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30)
==52814==    by 0x10923A: access_invalid_memory(int*) (in /home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds)
==52814==    by 0x10927F: main (in /home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds)
==52814== 
==52814== Use of uninitialised value of size 8
==52814==    at 0x499892B: ??? (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30)
==52814==    by 0x4998A78: std::ostreambuf_iterator<char, std::char_traits<char> > std::num_put<char, std::ostreambuf_iterator<char, std::char_traits<char> > >::_M_insert_int<long>(std::ostreambuf_iterator<char, std::char_traits<char> >, std::ios_base&, char, long) const (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30)
==52814==    by 0x49A7119: std::ostream& std::ostream::_M_insert<long>(long) (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30)
==52814==    by 0x10923A: access_invalid_memory(int*) (in /home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds)
==52814==    by 0x10927F: main (in /home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds)
==52814== 
==52814== Conditional jump or move depends on uninitialised value(s)
==52814==    at 0x499893D: ??? (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30)
==52814==    by 0x4998A78: std::ostreambuf_iterator<char, std::char_traits<char> > std::num_put<char, std::ostreambuf_iterator<char, std::char_traits<char> > >::_M_insert_int<long>(std::ostreambuf_iterator<char, std::char_traits<char> >, std::ios_base&, char, long) const (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30)
==52814==    by 0x49A7119: std::ostream& std::ostream::_M_insert<long>(long) (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30)
==52814==    by 0x10923A: access_invalid_memory(int*) (in /home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds)
==52814==    by 0x10927F: main (in /home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds)
==52814== 
==52814== Conditional jump or move depends on uninitialised value(s)
==52814==    at 0x4998AAE: std::ostreambuf_iterator<char, std::char_traits<char> > std::num_put<char, std::ostreambuf_iterator<char, std::char_traits<char> > >::_M_insert_int<long>(std::ostreambuf_iterator<char, std::char_traits<char> >, std::ios_base&, char, long) const (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30)
==52814==    by 0x49A7119: std::ostream& std::ostream::_M_insert<long>(long) (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30)
==52814==    by 0x10923A: access_invalid_memory(int*) (in /home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds)
==52814==    by 0x10927F: main (in /home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds)
==52814== 
Invalid value: 20
==52814== 
==52814== HEAP SUMMARY:
==52814==     in use at exit: 4 bytes in 1 blocks
==52814==   total heap usage: 3 allocs, 2 frees, 73,732 bytes allocated
==52814== 
==52814== LEAK SUMMARY:
==52814==    definitely lost: 4 bytes in 1 blocks
==52814==    indirectly lost: 0 bytes in 0 blocks
==52814==      possibly lost: 0 bytes in 0 blocks
==52814==    still reachable: 0 bytes in 0 blocks
==52814==         suppressed: 0 bytes in 0 blocks
==52814== Rerun with --leak-check=full to see details of leaked memory
==52814== 
==52814== Use --track-origins=yes to see where uninitialised values come from
==52814== For lists of detected and suppressed errors, rerun with: -s
==52814== ERROR SUMMARY: 7 errors from 5 contexts (suppressed: 0 from 0)


// valgrind --tool=cachegrind ./Heap-out-of-bounds

==52815== Cachegrind, a cache and branch-prediction profiler
==52815== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==52815== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==52815== Command: ./Heap-out-of-bounds
==52815== 
--52815-- warning: L3 cache found, using its data for the LL simulation.
Invalid value: 20
==52815== 
==52815== I   refs:      2,294,760
==52815== I1  misses:        2,090
==52815== LLi misses:        1,992
==52815== I1  miss rate:      0.09%
==52815== LLi miss rate:      0.09%
==52815== 
==52815== D   refs:        751,542  (552,475 rd   + 199,067 wr)
==52815== D1  misses:       15,940  ( 13,480 rd   +   2,460 wr)
==52815== LLd misses:        9,231  (  7,642 rd   +   1,589 wr)
==52815== D1  miss rate:       2.1% (    2.4%     +     1.2%  )
==52815== LLd miss rate:       1.2% (    1.4%     +     0.8%  )
==52815== 
==52815== LL refs:          18,030  ( 15,570 rd   +   2,460 wr)
==52815== LL misses:        11,223  (  9,634 rd   +   1,589 wr)
==52815== LL miss rate:        0.4% (    0.3%     +     0.8%  )
```
### ASan Report
```
// g++ -fsanitize=address Heap-out-of-bounds.cpp -o Heap-out-of-bounds-asan
// ./Heap-out-of-bounds-asan

=================================================================
==52822==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x6020000001a0 at pc 0x55f7b68a133b bp 0x7ffcc0fa4570 sp 0x7ffcc0fa4560
WRITE of size 4 at 0x6020000001a0 thread T0
    #0 0x55f7b68a133a in access_invalid_memory(int*) (/home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds-asan+0x133a)
    #1 0x55f7b68a1424 in main (/home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds-asan+0x1424)
    #2 0x79bdca029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x79bdca029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #4 0x55f7b68a1224 in _start (/home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds-asan+0x1224)

0x6020000001a0 is located 396 bytes to the right of 4-byte region [0x602000000010,0x602000000014)
allocated by thread T0 here:
    #0 0x79bdca8b61e7 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:99
    #1 0x55f7b68a13d3 in main (/home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds-asan+0x13d3)
    #2 0x79bdca029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/uu/lab5testcase/Heap-out-of-bounds/Heap-out-of-bounds-asan+0x133a) in access_invalid_memory(int*)
Shadow bytes around the buggy address:
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff8000: fa fa 04 fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
=>0x0c047fff8030: fa fa fa fa[fa]fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8060: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8070: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==52822==ABORTING

```
 valgrind 能 ,ASan 能
### Stack out-of-bounds
#### Source code
```
#include <iostream>

using namespace std;

void invalid_array_access(int *arr, int index) {
  cout << "Array element at index " << index << ": " << arr[index] << endl; // Invalid access
}

int main() {
  int arr[10]; // Create an array of size 10

  invalid_array_access(arr, 15); // Attempt to access beyond array bounds

  return 0;
}
```
#### Valgrind Report
```
// g++ Stack-out-of-bounds.cpp -o Stack-out-of-bounds
// valgrind --tool=memcheck ./Stack-out-of-bounds 

==53033== Memcheck, a memory error detector
==53033== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==53033== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==53033== Command: ./Stack-out-of-bounds
==53033== 
Array element at index 15: 0
==53033== 
==53033== HEAP SUMMARY:
==53033==     in use at exit: 0 bytes in 0 blocks
==53033==   total heap usage: 2 allocs, 2 frees, 73,728 bytes allocated
==53033== 
==53033== All heap blocks were freed -- no leaks are possible
==53033== 
==53033== For lists of detected and suppressed errors, rerun with: -s
==53033== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)


// valgrind --tool=cachegrind ./Stack-out-of-bounds 

==53034== Cachegrind, a cache and branch-prediction profiler
==53034== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==53034== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==53034== Command: ./Stack-out-of-bounds
==53034== 
--53034-- warning: L3 cache found, using its data for the LL simulation.
Array element at index 15: 0
==53034== 
==53034== I   refs:      2,296,033
==53034== I1  misses:        2,087
==53034== LLi misses:        1,991
==53034== I1  miss rate:      0.09%
==53034== LLi miss rate:      0.09%
==53034== 
==53034== D   refs:        752,005  (552,818 rd   + 199,187 wr)
==53034== D1  misses:       15,939  ( 13,478 rd   +   2,461 wr)
==53034== LLd misses:        9,235  (  7,646 rd   +   1,589 wr)
==53034== D1  miss rate:       2.1% (    2.4%     +     1.2%  )
==53034== LLd miss rate:       1.2% (    1.4%     +     0.8%  )
==53034== 
==53034== LL refs:          18,026  ( 15,565 rd   +   2,461 wr)
==53034== LL misses:        11,226  (  9,637 rd   +   1,589 wr)
==53034== LL miss rate:        0.4% (    0.3%     +     0.8%  )
```
### ASan Report
```
// g++ -fsanitize=address Stack-out-of-bounds.cpp -o Stack-out-of-bounds-asan 
// ./Stack-out-of-bounds-asan

=================================================================
==53043==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe800fbc9c at pc 0x57364385338a bp 0x7ffe800fbc00 sp 0x7ffe800fbbf0
READ of size 4 at 0x7ffe800fbc9c thread T0
    #0 0x573643853389 in invalid_array_access(int*, int) (/home/uu/lab5testcase/Stack-out-of-bounds/Stack-out-of-bounds-asan+0x1389)
    #1 0x57364385345e in main (/home/uu/lab5testcase/Stack-out-of-bounds/Stack-out-of-bounds-asan+0x145e)
    #2 0x7ea26ea29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7ea26ea29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #4 0x573643853224 in _start (/home/uu/lab5testcase/Stack-out-of-bounds/Stack-out-of-bounds-asan+0x1224)

Address 0x7ffe800fbc9c is located in stack of thread T0 at offset 108 in frame
    #0 0x5736438533b7 in main (/home/uu/lab5testcase/Stack-out-of-bounds/Stack-out-of-bounds-asan+0x13b7)

  This frame has 1 object(s):
    [48, 88) 'arr' (line 10) <== Memory access at offset 108 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/uu/lab5testcase/Stack-out-of-bounds/Stack-out-of-bounds-asan+0x1389) in invalid_array_access(int*, int)
Shadow bytes around the buggy address:
  0x100050017740: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100050017750: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100050017760: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100050017770: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100050017780: 00 00 00 00 00 00 f1 f1 f1 f1 f1 f1 00 00 00 00
=>0x100050017790: 00 f3 f3[f3]f3 f3 00 00 00 00 00 00 00 00 00 00
  0x1000500177a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000500177b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000500177c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000500177d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000500177e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==53043==ABORTING
```
 valgrind 不能  ,ASan 能
### Global out-of-bounds
#### Source code
```
#include <iostream>

int global_array[10];

int main() {
  // Global out-of-bounds read
  volatile int value = global_array[10]; // Volatile declaration to prevent compiler optimizations

  // Global out-of-bounds write
  global_array[10] = 100;

  return 0;
}
```
#### Valgrind Report
```
// g++ Global-out-of-bounds.cpp -o Global-out-of-bounds
// valgrind --tool=memcheck ./Global-out-of-bounds 

==53415== Memcheck, a memory error detector
==53415== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==53415== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==53415== Command: ./Global-out-of-bounds
==53415== 
==53415== 
==53415== HEAP SUMMARY:
==53415==     in use at exit: 0 bytes in 0 blocks
==53415==   total heap usage: 1 allocs, 1 frees, 72,704 bytes allocated
==53415== 
==53415== All heap blocks were freed -- no leaks are possible
==53415== 
==53415== For lists of detected and suppressed errors, rerun with: -s
==53415== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)


// valgrind --tool=cachegrind ./Global-out-of-bounds 

==53416== Cachegrind, a cache and branch-prediction profiler
==53416== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==53416== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==53416== Command: ./Global-out-of-bounds
==53416== 
--53416-- warning: L3 cache found, using its data for the LL simulation.
==53416== 
==53416== I   refs:      2,278,193
==53416== I1  misses:        1,912
==53416== LLi misses:        1,844
==53416== I1  miss rate:      0.08%
==53416== LLi miss rate:      0.08%
==53416== 
==53416== D   refs:        744,950  (547,993 rd   + 196,957 wr)
==53416== D1  misses:       15,722  ( 13,278 rd   +   2,444 wr)
==53416== LLd misses:        9,171  (  7,587 rd   +   1,584 wr)
==53416== D1  miss rate:       2.1% (    2.4%     +     1.2%  )
==53416== LLd miss rate:       1.2% (    1.4%     +     0.8%  )
==53416== 
==53416== LL refs:          17,634  ( 15,190 rd   +   2,444 wr)
==53416== LL misses:        11,015  (  9,431 rd   +   1,584 wr)
==53416== LL miss rate:        0.4% (    0.3%     +     0.8%  )
```
### ASan Report
```
// g++ -fsanitize=address Global-out-of-bounds.cpp -o Global-out-of-bounds-asan
// ./Global-out-of-bounds-asan 

=================================================================
==53422==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5beb416d3148 at pc 0x5beb416d030e bp 0x7ffeabe87ea0 sp 0x7ffeabe87e90
READ of size 4 at 0x5beb416d3148 thread T0
    #0 0x5beb416d030d in main (/home/uu/lab5testcase/Global-out-of-bounds/Global-out-of-bounds-asan+0x130d)
    #1 0x755392c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x755392c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5beb416d01a4 in _start (/home/uu/lab5testcase/Global-out-of-bounds/Global-out-of-bounds-asan+0x11a4)

0x5beb416d3148 is located 0 bytes to the right of global variable 'global_array' defined in 'Global-out-of-bounds.cpp:3:5' (0x5beb416d3120) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/uu/lab5testcase/Global-out-of-bounds/Global-out-of-bounds-asan+0x130d) in main
Shadow bytes around the buggy address:
  0x0b7de82d25d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b7de82d25e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b7de82d25f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b7de82d2600: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
  0x0b7de82d2610: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 01 f9 f9 f9
=>0x0b7de82d2620: f9 f9 f9 f9 00 00 00 00 00[f9]f9 f9 f9 f9 f9 f9
  0x0b7de82d2630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b7de82d2640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b7de82d2650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b7de82d2660: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b7de82d2670: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==53422==ABORTING

```
 valgrind 不能  ,ASan 能
### Use-after-free
#### Source code
```
#include <iostream>

int main() {
  int *ptr = new int;
  *ptr = 10;
  delete ptr;
  *ptr = 20; // 堆溢出讀寫錯誤

  return 0;
}
```
#### Valgrind Report
```
// g++ Heap-use-after-free.cpp -o Heap-use-after-free -lstdc++
// valgrind ./Heap-use-after-free

==52187== Memcheck, a memory error detector
==52187== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==52187== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==52187== Command: ./Heap-out-of-bounds
==52187== 
==52187== Invalid write of size 4
==52187==    at 0x1091E7: main (in /home/uu/lab5testcase/Heap-out-of-bounds)
==52187==  Address 0x4ddcc80 is 0 bytes inside a block of size 4 free'd
==52187==    at 0x484BB6F: operator delete(void*, unsigned long) (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==52187==    by 0x1091E2: main (in /home/uu/lab5testcase/Heap-out-of-bounds)
==52187==  Block was alloc'd at
==52187==    at 0x4849013: operator new(unsigned long) (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==52187==    by 0x1091BE: main (in /home/uu/lab5testcase/Heap-out-of-bounds)
==52187== 
==52187== 
==52187== HEAP SUMMARY:
==52187==     in use at exit: 0 bytes in 0 blocks
==52187==   total heap usage: 2 allocs, 2 frees, 72,708 bytes allocated
==52187== 
==52187== All heap blocks were freed -- no leaks are possible
==52187== 
==52187== For lists of detected and suppressed errors, rerun with: -s
==52187== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)


// valgrind --tool=cachegrind ./Heap-use-after-free

==52191== Cachegrind, a cache and branch-prediction profiler
==52191== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==52191== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==52191== Command: ./Heap-out-of-bounds
==52191== 
--52191-- warning: L3 cache found, using its data for the LL simulation.
==52191== 
==52191== I   refs:      2,281,286
==52191== I1  misses:        1,950
==52191== LLi misses:        1,862
==52191== I1  miss rate:      0.09%
==52191== LLi miss rate:      0.08%
==52191== 
==52191== D   refs:        746,460  (549,017 rd   + 197,443 wr)
==52191== D1  misses:       15,791  ( 13,337 rd   +   2,454 wr)
==52191== LLd misses:        9,176  (  7,589 rd   +   1,587 wr)
==52191== D1  miss rate:       2.1% (    2.4%     +     1.2%  )
==52191== LLd miss rate:       1.2% (    1.4%     +     0.8%  )
==52191== 
==52191== LL refs:          17,741  ( 15,287 rd   +   2,454 wr)
==52191== LL misses:        11,038  (  9,451 rd   +   1,587 wr)
==52191== LL miss rate:        0.4% (    0.3%     +     0.8%  )

```
### ASan Report
```
// g++ -fsanitize=address Heap-use-after-free.cpp -o Heap-use-after-free-asan
// ./Heap-use-after-free-asan

=================================================================
==52267==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x5c6c67dcb331 bp 0x7fff8e1d7420 sp 0x7fff8e1d7410
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x5c6c67dcb330 in main (/home/uu/lab5testcase/Heap-out-of-bounds-asan+0x1330)
    #1 0x76b2b1c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x76b2b1c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5c6c67dcb1c4 in _start (/home/uu/lab5testcase/Heap-out-of-bounds-asan+0x11c4)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x76b2b24b724f in operator delete(void*, unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:172
    #1 0x5c6c67dcb2f9 in main (/home/uu/lab5testcase/Heap-out-of-bounds-asan+0x12f9)
    #2 0x76b2b1c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x76b2b24b61e7 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:99
    #1 0x5c6c67dcb29e in main (/home/uu/lab5testcase/Heap-out-of-bounds-asan+0x129e)
    #2 0x76b2b1c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free (/home/uu/lab5testcase/Heap-out-of-bounds-asan+0x1330) in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[fd]fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==52267==ABORTING
```
valgrind 能 ,ASan 能
### Use-after-return
#### Source code
```
volatile char* x;

void foo() {
    char stack_buffer[55];
    x = &stack_buffer[22];
}

int main() {

    foo();
    *x = 54; // Boom!

    return (*x == 54);
}
```
#### Valgrind Report
```
// g++ -o Use-after-return Use-after-return.cpp
// valgrind --tool=memcheck ./Use-after-return 

==57371== Memcheck, a memory error detector
==57371== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==57371== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==57371== Command: ./Use-after-return
==57371== 
==57371== 
==57371== HEAP SUMMARY:
==57371==     in use at exit: 0 bytes in 0 blocks
==57371==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==57371== 
==57371== All heap blocks were freed -- no leaks are possible
==57371== 
==57371== For lists of detected and suppressed errors, rerun with: -s
==57371== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)


// valgrind --tool=cachegrind ./Use-after-return

==57372== Cachegrind, a cache and branch-prediction profiler
==57372== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==57372== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==57372== Command: ./Use-after-return
==57372== 
--57372-- warning: L3 cache found, using its data for the LL simulation.
==57372== 
==57372== I   refs:      149,089
==57372== I1  misses:      1,143
==57372== LLi misses:      1,135
==57372== I1  miss rate:    0.77%
==57372== LLi miss rate:    0.76%
==57372== 
==57372== D   refs:       47,183  (34,684 rd   + 12,499 wr)
==57372== D1  misses:      2,141  ( 1,561 rd   +    580 wr)
==57372== LLd misses:      1,856  ( 1,314 rd   +    542 wr)
==57372== D1  miss rate:     4.5% (   4.5%     +    4.6%  )
==57372== LLd miss rate:     3.9% (   3.8%     +    4.3%  )
==57372== 
==57372== LL refs:         3,284  ( 2,704 rd   +    580 wr)
==57372== LL misses:       2,991  ( 2,449 rd   +    542 wr)
==57372== LL miss rate:      1.5% (   1.3%     +    4.3%  )
```
### ASan Report
```
// g++ -fsanitize=address  Use-after-return.cpp -o Use-after-return-asan
// ASAN_OPTIONS=detect_stack_use_after_return=1 ./Use-after-return-asan 

=================================================================
==57364==ERROR: AddressSanitizer: stack-use-after-return on address 0x7930646ae036 at pc 0x5ae6661cb37f bp 0x7ffe3b57ee10 sp 0x7ffe3b57ee00
WRITE of size 1 at 0x7930646ae036 thread T0
    #0 0x5ae6661cb37e in main (/home/uu/lab5testcase/Use-after-return/Use-after-return-asan+0x137e)
    #1 0x793067c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x793067c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5ae6661cb164 in _start (/home/uu/lab5testcase/Use-after-return/Use-after-return-asan+0x1164)

Address 0x7930646ae036 is located in stack of thread T0 at offset 54 in frame
    #0 0x5ae6661cb238 in foo() (/home/uu/lab5testcase/Use-after-return/Use-after-return-asan+0x1238)

  This frame has 1 object(s):
    [32, 87) 'stack_buffer' (line 6) <== Memory access at offset 54 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return (/home/uu/lab5testcase/Use-after-return/Use-after-return-asan+0x137e) in main
Shadow bytes around the buggy address:
  0x0f268c8cdbb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f268c8cdbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f268c8cdbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f268c8cdbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f268c8cdbf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0f268c8cdc00: f5 f5 f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0f268c8cdc10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f268c8cdc20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f268c8cdc30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f268c8cdc40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f268c8cdc50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==57364==ABORTING

```
valgrind 不能  ,ASan 能
## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>

int main() {
  int a[8] = {1, 2, 3, 4, 5, 6, 7, 8};
  int b[8] = {9, 10, 11, 12, 13, 14, 15, 16};

  // Declare a pointer to the first element of a
  int *ptr_a = &a[0];

  // Calculate the offset of the second element of b relative to the second element of a
  int offset = (char*)&b[1] - (char*)&a[1];

  // Display the size of the offset
  printf("Offset size: %d bytes\n", offset);

  // Write the value of a[1] to the second element of b using pointer arithmetic
  *(int*)((char*)ptr_a + offset) = *ptr_a + 1;

  printf("a[1] = %d, b[1] = %d\n", a[1], b[1]);

  return 0;
}
```
### Why
我用程式碼使用指標方式來執行越界寫入，而不會直接修改內存佈局。因此，ASan沒檢測到越界訪問。我算出int a[8]與int b[8]之間的距離是64bytes，另外利用print b[1]，其值為10的方式證明越界寫入成功。
