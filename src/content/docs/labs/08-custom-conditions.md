---
title: Lab 08. Custom Conditions
description: Trigger and compare input validation, preconditions, postconditions, and non-blocking check assertions.
---

| Level | Time | Objectives |
|---|---:|---|
| Advanced | 45-60 min | 4g |

**Read first:** [Validation layers](/domains/04-configuration/#4g-validation-layers)

## Outcome

같은 invariant를 아무 위치에나 복제하지 않고 **가장 이른 올바른 phase**에서 검증합니다. 각 failure가 plan/apply를 중단하는지 또는 warning을 남기는지 비교합니다.

## Build four tests

1. Variable `validation`: environment input이 allowlist에 있는지 확인합니다.
2. Resource `precondition`: operation 전에 region 또는 combined input assumption을 확인합니다.
3. Resource/data `postcondition`: provider가 읽거나 만든 결과의 attribute를 확인합니다.
4. `check` block: deployed system의 지속적 assertion을 평가합니다.

```bash
terraform init
terraform validate
terraform plan
```

각 condition을 한 번씩 실패시키고 다음을 기록합니다.

| Mechanism | Earliest available data | Expected failure behavior |
|---|---|---|
| Variable validation | Input value | Rejects invalid input |
| Precondition | Configuration plus earlier values | Blocks the affected operation |
| Postcondition | Read/applied result | Blocks dependent progress and reports failure |
| Check assertion | Operational result | Reports warning without blocking like pre/postconditions |

## Quality criteria

- Error message는 실패한 값, 기대 조건, 수정 방향을 설명합니다.
- Condition expression은 bool을 반환합니다.
- Unknown value 때문에 올바른 phase보다 너무 이른 검증을 강제하지 않습니다.
- `check`를 security enforcement로 오해하지 않습니다.

**Detailed walkthrough:** [Historical Lab 08](/archive/labs/lab-08-custom-conditions/readme/)  
**Next:** [Lab 09 Dynamic blocks](/labs/09-dynamic-blocks/) · [Configuration questions](/archive/practice-exams/domain-4-configuration/)
