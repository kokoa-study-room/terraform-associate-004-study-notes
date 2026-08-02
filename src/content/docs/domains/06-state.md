---
title: 06. 상태 관리 / State Management
description: "Objectives 6a-6d: local and remote backends, locking, drift, and state refactoring."
---

## Three-way comparison

Terraform operation compares three things: **configuration (desired)**, **prior state (known binding)**, and **remote objects (observed reality)**. A plan explains the proposed convergence among them.

## 6a-6c. Backend and locking

The local backend stores state on disk. Remote backends centralize storage and may provide locking. Backend configuration is initialized with `terraform init`; changing it can trigger state migration or reconfiguration choices.

```hcl
terraform {
  backend "s3" {
    bucket       = "example-terraform-state"
    key          = "production/terraform.tfstate"
    region       = "ap-northeast-2"
    encrypt      = true
    use_lockfile = true
  }
}
```

:::caution
Terraform 1.12의 S3 backend는 `use_lockfile`을 지원합니다. DynamoDB-based locking은 deprecated이므로 기존 Archive의 DynamoDB 필수 설명을 현재 권장 방식으로 사용하지 마세요.
:::

Locking prevents competing state writers; it does not protect against every operational race or secure state contents. Force-unlock only after verifying the original writer is gone.

## 6d. Drift and safe refactoring

| Situation | Preferred mechanism |
|---|---|
| Observe external changes | normal plan or refresh-only plan |
| Accept remote changes into state only | `terraform apply -refresh-only` after review |
| Rename/move an address | `moved` block |
| Stop managing without destroying | `removed` block with appropriate lifecycle |
| Inspect bindings | `terraform state list/show`, `terraform show` |

Manual state editing is the last resort. Pull a backup, use supported commands, and understand that state subcommands change bindings rather than remote infrastructure unless their documentation says otherwise.

## 다음 연결 / Why next

State를 이해하면 기존 객체를 import하고 문제를 진단할 수 있습니다. 다음은 [maintain infrastructure](/domains/07-maintain/)입니다.

**Official sources:** [State](https://developer.hashicorp.com/terraform/language/v1.12.x/state), [Backends](https://developer.hashicorp.com/terraform/language/v1.12.x/state/backends), [Locking](https://developer.hashicorp.com/terraform/language/v1.12.x/state/locking), [Refactor](https://developer.hashicorp.com/terraform/language/v1.12.x/state/refactor)  
**Labs:** [Remote state](/archive/labs/lab-06-remote-state/readme/), [State manipulation](/archive/labs/lab-10-state-manipulation/readme/)
