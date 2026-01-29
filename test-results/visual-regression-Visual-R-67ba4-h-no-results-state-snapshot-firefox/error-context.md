# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - heading "Pokemon" [level=1] [ref=e3]
    - generic [ref=e4]:
      - img [ref=e5]
      - textbox "Search Pokemon by name..." [ref=e7]: xyznonexistent
      - button "Clear search" [ref=e8]:
        - img [ref=e9]
    - paragraph [ref=e12]: No Pokemon found for "xyznonexistent"
    - generic [ref=e13]:
      - button "Previous" [disabled]
      - generic [ref=e14]: Page 1 of -1
      - button "Next" [ref=e15] [cursor=pointer]
  - generic [ref=e16]:
    - img [ref=e18]
    - button "Open Tanstack query devtools" [ref=e67] [cursor=pointer]:
      - img [ref=e68]
  - button "Open TanStack Devtools" [ref=e117] [cursor=pointer]:
    - img "TanStack Devtools" [ref=e118]
```