---
title: Lab 07. Lifecycle 판단 / Lifecycle Decisions
description: Compare replacement ordering, destroy protection, and drift ownership using lifecycle meta-arguments.
---

| Level | Time | Objectives |
|---|---:|---|
| Intermediate | 45-65 min | 4f |

**Read first:** [Dependencies and lifecycle](/domains/04-configuration/#4f-dependencies), [State model](/domains/06-state/)

## Outcome

`create_before_destroy`, `prevent_destroy`, `ignore_changes`가 해결하는 서로 다른 문제를 plan으로 비교합니다. Lifecycle은 모든 change를 안전하게 만드는 장식이 아니라 ownership과 replacement decision입니다.

## Experiments

### Replacement ordering

1. Provider schema에서 replacement를 요구하는 argument를 하나 선택합니다.
2. Normal plan과 `create_before_destroy = true` plan의 action order를 비교합니다.
3. 이름 uniqueness, quota, dependency가 old/new 동시 존재를 허용하는지 확인합니다.

### Destroy protection

```hcl
lifecycle {
  prevent_destroy = true
}
```

Destroy 또는 replacement plan이 configuration error로 중단되는지 확인합니다. Block을 configuration에서 완전히 제거하면 이 보호를 평가할 block도 사라질 수 있으므로 별도 policy와 backup을 대신하지 않습니다.

### Shared ownership

`ignore_changes`에 provider가 아닌 외부 controller가 소유하는 한 attribute만 지정합니다. 전체 변경을 무시하거나 실제 drift를 숨기는 설정은 피합니다.

## Verification

- `create_before_destroy`: replacement order
- `prevent_destroy`: configured object의 destroy/replacement 거부
- `ignore_changes`: selected attribute의 update ownership 조정
- `replace_triggered_by`: 다른 managed change에 따른 replacement signal

Apply한 cloud object는 lifecycle protection을 제거하는 plan을 먼저 review한 뒤 destroy합니다.

**Detailed walkthrough:** [Historical Lab 07](/archive/labs/lab-07-lifecycle/readme/)  
**Next:** [Lab 08 Custom conditions](/labs/08-custom-conditions/) · [Command matrix](/reference/command-behavior-matrix/)
