# Lab 13: SQL

## Announcements 

- Scheme project due tomorrow (submit tonight for 1 EC)
- HW09: Extended to Monday 
  - if downloaded before Monday night, redownload it (latest version fixes some ok test bugs)
- Course Evaluations due Sunday
  - if 95% of students fill it out 1 EC
- OH starts as early as 8am so you can potentially be on OH from 8am to 7pm today and tomorrow (minus lecture)

## Lab

- General: remember the semicolons!

1. TBD
2. Column names is `seven` not `sevens` lol
3. Make sure `limit 20` 
4. TBD
5. tbl.'7' to actually get column '7', check = 'True'
6. Make sure to order time so that first student responded sooner than second


# Lab 12: Iterators, Generators and Streams

## Announcements

- Lab 12: Iterators, Generators and Streams due tomorrow night
- HW 09: Iterators, Generators and Streams due Friday
- Scheme: due Thursday (turn in Wednesday for 1 EC)
- Course Evaluations: submit by Sunday, if 95% of students do it 1 EC pt

## Lab questions/tips

1. Why is 3rd `next(t)` equal to `[]`
  - 1st: called `next(t)`, returns `1` now `t` is `[ [2,[3,[4]]] ]`
  - 2nd: called `next(t)` first (then some other stuff), returns `[2,[3,[4]]]` now `t` is `[]`

2. TBD

3. Countdown
  - make sure `-=` not `+=` if infinite loop

4. Trap
  - Make sure call `iter(s)` to make iterator
  - Manually raise `ValueError` not default `StopIteration`

5. Repeated
  - No `yield` only `return` (isn't supposed to be generator, in instructions)

6. Ones
  - IMPORTANT: only modify the line
  ```python
  ones = None
  ```
  NOT the function `test_ones`
  - `ones = Stream(1, ones)` won't work because `ones` isn't defined
  - `ones = Stream(1, lambda: ones)` will work because `lambda: ones` only evaluates `ones` when called

7. Scan
  - make sure there is `lambda` or some kind of function in second argument of `Stream(__,__)`
  - What's first element of stream? `initial_value`
  - Second element? `f(initial_value, stream.first)`
    - This'll be new `initial_value` in recursive call

### Extra Credit Qs (low priority)

8. Scale
  - Two possible  solns:
    ```python
    i = iter(s)
    while True:
        yield k * next(i)
    ```
    Official:
    ```python
    for elem in s:
        yield elem * k
    ```
  - I personally did first (it's the more pattern matchy approach)
  - Second works because `for elem in s` automatically does `iter(s)`

9. Remainder Generator
  - Two possible solns:
  ```python
  for i in range(m):
        def f():
            j = i
            while True:
                yield j
                j += m
        yield f()
  ```
  Official:
  
  ```python
  def remainder_group(rem):
        start = rem
        while True:
            yield start
            start += m

    for rem in range(m):
        yield remainder_group(rem)
  ```
  - I personally did first, thought process was to yield function like it said but then it errored so changed `f` to `f()`
