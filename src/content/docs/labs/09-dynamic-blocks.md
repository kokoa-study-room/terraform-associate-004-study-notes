---
title: Lab 09. Dynamic Blocks
description: Generate repeatable nested blocks from typed collections without confusing blocks with ordinary values.
---

| Level | Time | Objectives |
|---|---:|---|
| Advanced | 40-60 min | 4d-4e |

**Read first:** [Types and expressions](/domains/04-configuration/#4c-4e-values-types-expressions), [Lab 04](/labs/04-count-for-each/)

## Outcome

Typed collection에서 provider resource의 repeatable nested block을 생성합니다. `dynamic`은 resource instance를 반복하는 `for_each`와 목적이 다릅니다.

## Model the input

```hcl
variable "ingress_rules" {
  type = map(object({
    port        = number
    description = string
    cidrs       = set(string)
  }))
}
```

Map key를 stable rule identity로 사용하고 validation으로 port range와 empty CIDR을 검사합니다.

## Generate nested blocks

```hcl
dynamic "ingress" {
  for_each = var.ingress_rules
  content {
    from_port   = ingress.value.port
    to_port     = ingress.value.port
    protocol    = "tcp"
    cidr_blocks = sort(tolist(ingress.value.cidrs))
    description = ingress.value.description
  }
}
```

`terraform console`에서 input transformation을 먼저 확인한 뒤 plan을 생성합니다. Rule 하나를 추가·제거하고 nested block diff를 비교합니다.

## Verification

- Ordinary argument에는 `for` expression을 사용합니다.
- Repeatable nested block에만 `dynamic` block을 사용합니다.
- Provider가 요구하는 block label과 schema를 registry documentation에서 확인합니다.
- 과도한 dynamic abstraction이 module interface를 읽기 어렵게 만들면 explicit block을 선택합니다.

Security group 같은 cloud resource를 apply했다면 rule과 resource가 모두 destroy됐는지 확인합니다.

**Detailed walkthrough:** [Historical Lab 09](/archive/labs/lab-09-dynamic-blocks/readme/)  
**Next:** [Lab 10 State operations](/labs/10-state-operations/) · [Official dynamic blocks](https://developer.hashicorp.com/terraform/language/v1.12.x/expressions/dynamic-blocks)
