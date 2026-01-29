# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - heading "Pokemon" [level=1] [ref=e3]
    - generic [ref=e4]:
      - img [ref=e5]
      - textbox "Search Pokemon by name..." [ref=e7]: pikachu
      - button "Clear search" [ref=e8]:
        - img [ref=e9]
    - generic [ref=e12]:
      - generic [ref=e13]:
        - generic [ref=e14]: "#025"
        - img "Pikachu" [ref=e15]
      - generic [ref=e17]: Pikachu
      - button "View Pokemon" [ref=e19] [cursor=pointer]
    - generic [ref=e20]:
      - button "Previous" [disabled]
      - generic [ref=e21]: Page 1 of 1
      - button "Next" [disabled]
  - generic [ref=e22]:
    - img [ref=e24]
    - button "Open Tanstack query devtools" [ref=e72] [cursor=pointer]:
      - img [ref=e73]
  - button "Open TanStack Devtools" [ref=e121] [cursor=pointer]:
    - img "TanStack Devtools" [ref=e122]
```