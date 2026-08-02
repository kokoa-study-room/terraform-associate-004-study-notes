---
title: Lab 11. Registry Module과 Version
description: Evaluate a registry module contract, constrain its version, and distinguish module selection from provider locking.
---

| Level | Time | Objectives |
|---|---:|---|
| Advanced | 40-60 min | 5a, 5d |

**Read first:** [Modules](/domains/05-modules/), [Terraform 1.12 dependency locks](/reference/terraform-1-12-deep-dive/#provider-constraints-and-the-lock-file)

## Outcome

Terraform Registry module 하나를 선택해 source, version, input, output, provider requirement를 검토합니다. Apply보다 contract review와 dependency selection이 핵심입니다.

## Evaluate before use

1. Verified publisher 여부와 source repository를 확인합니다.
2. Required Terraform/provider version과 upgrade notes를 읽습니다.
3. Required input, default, output, created resource 목록을 확인합니다.
4. Example을 그대로 production에 복사하지 않고 최소 caller를 작성합니다.

```hcl
module "example" {
  source  = "NAMESPACE/NAME/PROVIDER"
  version = "~> X.Y"
}
```

## Initialize and compare

```bash
terraform init
terraform providers
terraform validate
terraform plan
```

- `.terraform/modules/modules.json`에서 selected module source를 관찰하되 generated metadata를 commit하지 않습니다.
- `.terraform.lock.hcl`에는 provider selection과 checksum이 기록되지만 remote module selection은 기록되지 않습니다.
- Module `version`은 registry source에 사용합니다. Git source는 `?ref=`를 사용하고 local source는 local file을 직접 읽습니다.

Version constraint를 허용 범위 안에서 바꾸고 `terraform init -upgrade` 전후 selection을 비교합니다. Upgrade 후 plan과 changelog를 반드시 review합니다.

## Safety and cleanup

Network/VPC module처럼 유료 resource를 많이 만드는 module은 plan까지만 수행해도 목표를 달성할 수 있습니다. Apply했다면 module output이 아니라 plan/state의 전체 resource 목록을 기준으로 destroy 완료를 확인합니다.

**Detailed walkthrough:** [Historical Lab 11](/archive/labs/lab-11-module-registry/readme/)  
**Next:** [Lab 12 HCP Terraform](/labs/12-hcp-terraform/) · [Module questions](/archive/practice-exams/domain-5-modules/)
