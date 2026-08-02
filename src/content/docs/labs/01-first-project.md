---
title: Lab 01. 첫 프로젝트 / First Project
description: Observe provider installation, dependency locking, planning, state creation, and cleanup in the core Terraform workflow.
---

| Level | Time | Objectives |
|---|---:|---|
| Beginner | 35-50 min | 2a-2d, 3a-3g, 6a |

**Read first:** [IaC](/domains/01-iac/), [Fundamentals](/domains/02-fundamentals/), [Core workflow](/domains/03-workflow/)

## Outcome

AWS S3 bucket configuration을 사용해 `init → plan → apply → inspect → destroy`를 한 번 수행합니다. 핵심은 bucket 자체가 아니라 각 단계가 어떤 artifact를 읽고 쓰는지 설명하는 것입니다.

## Prepare

1. Disposable AWS account/profile과 globally unique bucket suffix를 준비합니다.
2. [solution files](/guide/labs-and-practice/#lab-01)을 빈 Lab directory에 저장하고 placeholder bucket name을 변경합니다.
3. `.gitignore`에 `.terraform/`, plan file, `*.tfstate*`가 포함됐는지 확인합니다.

## Execute and observe

```bash
terraform fmt -check
terraform init
terraform validate
terraform plan -out=tfplan
terraform show tfplan
```

- `init` 뒤 `.terraform.lock.hcl`에 선택된 provider version과 checksum이 생기는지 확인합니다.
- Plan에서 S3 bucket과 연결 resource 사이의 reference dependency를 찾습니다.
- 예상 action을 설명할 수 있을 때만 `terraform apply tfplan`을 실행합니다.

```bash
terraform state list
terraform state show aws_s3_bucket.my_first_bucket
terraform output
```

State address와 AWS object ID가 어떤 binding을 만드는지 기록합니다.

## Success and cleanup

- 두 번째 normal plan이 예상한 변경 없음 또는 설명 가능한 drift만 표시합니다.
- `terraform destroy` 후 AWS console과 `terraform state list`를 모두 확인합니다.
- Saved plan과 local state를 공유 repository에 남기지 않습니다.

## Explain before moving on

1. Provider constraint와 lock selection은 어떻게 다른가?
2. Plan file을 apply에 전달하면 무엇을 다시 계산하지 않는가?
3. State가 없으면 Terraform은 기존 bucket과 resource address의 관계를 어떻게 아는가?

**Detailed walkthrough:** [Historical Lab 01](/archive/labs/lab-01-first-project/readme/)  
**Next:** [Lab 02 Variables and outputs](/labs/02-variables-outputs/) · [Command matrix](/reference/command-behavior-matrix/)
