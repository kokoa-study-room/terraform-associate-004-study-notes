---
title: Lab 05. Child Module 만들기 / Build a Module
description: Extract a reusable child module and test its input, output, provider, and scope boundaries.
---

| Level | Time | Objectives |
|---|---:|---|
| Intermediate | 60-90 min | 5a-5c |

**Read first:** [Modules](/domains/05-modules/), [Variables and outputs](/labs/02-variables-outputs/)

## Outcome

Root module의 resource를 local child module로 추출합니다. Directory 분리는 목적이 아니라 input/output contract와 scope boundary를 만드는 수단입니다.

## Build the contract

```text
.
├── main.tf
├── outputs.tf
├── variables.tf
└── modules/
    └── storage/
        ├── main.tf
        ├── outputs.tf
        └── variables.tf
```

1. Child module이 받아야 하는 값만 variable로 선언합니다.
2. Caller가 사용해야 하는 attribute만 output으로 노출합니다.
3. Child module에는 provider **requirement**를 선언하되 credential이나 region 같은 root configuration을 하드코딩하지 않습니다.
4. Root module에서 `source = "./modules/storage"`로 호출합니다.

```bash
terraform init
terraform validate
terraform plan
```

Local module source를 추가하거나 바꾼 뒤 `init`이 필요한 이유를 확인합니다.

## Failure tests

- Required input을 제거해 caller contract error를 확인합니다.
- Wrong type을 전달해 type constraint error를 확인합니다.
- Child resource를 root에서 직접 참조하려 하지 말고 output이 필요한 이유를 설명합니다.
- Provider alias가 필요한 시나리오라면 module call의 `providers` map으로 명시적으로 전달합니다.

## Verification and cleanup

- Plan의 address가 `module.storage.<TYPE>.<NAME>` 형태인지 확인합니다.
- Root variable과 child variable은 이름이 같아도 자동 공유되지 않습니다.
- Apply했다면 module resource를 포함한 destroy plan을 review한 뒤 cleanup합니다.

**Detailed walkthrough:** [Historical Lab 05](/archive/labs/lab-05-first-module/readme/)  
**Next:** [Lab 06 Remote state](/labs/06-remote-state/) · [Lab 11 Registry modules](/labs/11-registry-modules/)
