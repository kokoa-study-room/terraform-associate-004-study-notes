---
title: Lab 04. count와 for_each
description: Compare index-based and key-based resource addresses and predict changes when collection membership changes.
---

| Level | Time | Objectives |
|---|---:|---|
| Intermediate | 45-60 min | 4d-4f |

**Read first:** [Types, expressions, dependencies](/domains/04-configuration/#4c-4e-values-types-expressions)

## Outcome

같은 세 항목을 `count`와 `for_each`로 선언하고 중간 항목을 제거합니다. 핵심 관찰 대상은 remote 이름이 아니라 state의 **instance address 안정성**입니다.

## Experiment

1. Historical guide의 count와 for_each configuration을 별도 directory에서 준비합니다.
2. Apply 전 plan에서 address를 적습니다.

```text
example.item[0]
example.item[1]
example.item[2]

example.item["api"]
example.item["db"]
example.item["web"]
```

3. `terraform state list` 결과를 저장합니다.
4. List 중간 값과 map/set의 같은 key를 각각 제거합니다.
5. 새 plan의 address와 action을 이전 결과와 비교합니다.

Provider resource의 replace/update 결과는 schema에 따라 달라질 수 있습니다. “count는 항상 N개를 재생성한다”를 외우지 말고 index가 이동해 어떤 instance가 어떤 input을 받게 됐는지 설명하세요.

## Verification

- `count.index`는 numeric position과 결합됩니다.
- `each.key`는 stable key와 결합됩니다.
- `for_each`는 map 또는 set of strings를 직접 받으며 list는 명시적 conversion이 필요합니다.
- Unknown collection keys는 plan 전에 instance address를 정할 수 없으므로 사용할 수 없습니다.

Apply했다면 원래 collection을 복원하지 말고 `terraform destroy`로 Lab object를 정리합니다.

**Detailed walkthrough:** [Historical Lab 04](/archive/labs/lab-04-count-for-each/readme/)  
**Related:** [Configuration concepts](/domains/04-configuration/) · [Configuration questions](/archive/practice-exams/domain-4-configuration/)  
**Next:** [Lab 05 Modules](/labs/05-modules/)
