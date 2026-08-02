---
title: Lab 06. Remote State와 Locking
description: Migrate local state to an S3 backend using Terraform 1.12 lock files and verify safe locking behavior.
---

| Level | Time | Objectives |
|---|---:|---|
| Intermediate | 50-70 min | 6a-6c |

**Read first:** [State management](/domains/06-state/), [Terraform 1.12 S3 locking](/reference/terraform-1-12-deep-dive/#s3-state-locking)

## Outcome

Local state를 pre-created S3 backend로 migrate하고 `use_lockfile = true`의 lock object를 확인합니다. DynamoDB table은 만들지 않습니다.

:::caution[Bootstrap and recovery]
Backend bucket을 같은 state 안에서 생성하지 마세요. Backend는 state를 읽기 전에 존재해야 합니다. Versioning과 encryption을 활성화하고 disposable key prefix를 사용합니다.
:::

## Configure

```hcl
terraform {
  backend "s3" {
    bucket       = "YOUR_EXISTING_STATE_BUCKET"
    key          = "labs/06/terraform.tfstate"
    region       = "ap-northeast-2"
    encrypt      = true
    use_lockfile = true
  }
}
```

Credential을 backend block에 작성하지 말고 environment, profile, workload identity 같은 standard credential chain을 사용합니다.

## Migrate and observe

```bash
terraform init -migrate-state
terraform state pull > state-backup.json
terraform plan
```

1. Migration prompt의 source와 destination을 읽고 승인합니다.
2. S3에서 state object와 version history를 확인합니다.
3. State write operation 동안 같은 key의 `.tflock` object가 생성되는지 확인합니다.
4. 두 번째 writer가 lock을 얻지 못하면 operation이 계속되지 않는 이유를 설명합니다.

`-lock=false`와 `force-unlock`을 정상 workflow로 사용하지 않습니다. Force unlock은 원래 writer가 종료됐고 자동 unlock이 실패한 자신의 lock에만 사용합니다.

## Cleanup

1. Managed Lab resources를 먼저 destroy합니다.
2. 필요하면 backend block을 제거하고 `terraform init -migrate-state`로 local state를 복구합니다.
3. State와 lock object가 안전하게 정리된 뒤 Lab key prefix를 삭제합니다.
4. Backup에는 secret이 있을 수 있으므로 안전하게 폐기합니다.

**Detailed walkthrough:** [Historical Lab 06](/archive/labs/lab-06-remote-state/readme/)의 DynamoDB 설명보다 이 페이지의 Terraform 1.12 절차를 우선합니다.  
**Next:** [Lab 07 Lifecycle](/labs/07-lifecycle/) · [State questions](/archive/practice-exams/domain-6-state/)
