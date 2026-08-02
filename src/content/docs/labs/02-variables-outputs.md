---
title: Lab 02. 변수와 출력 / Variables and Outputs
description: Build and test a typed module interface using input variables, locals, conditional resources, and outputs.
---

| Level | Time | Objectives |
|---|---:|---|
| Beginner | 40-55 min | 4c-4e |

**Read first:** [Configuration 4c-4e](/domains/04-configuration/#4c-4e-values-types-expressions)

## Outcome

S3 configuration의 hard-coded value를 typed input으로 바꾸고 output을 통해 선택한 결과만 노출합니다. Variable source, type conversion, conditional `count`, output dependency를 관찰합니다.

## Prepare and predict

1. [Lab 02 downloads](/guide/labs-and-practice/#lab-02)을 disposable directory에 저장합니다.
2. `terraform.tfvars.example`을 `terraform.tfvars`로 복사하고 unique prefix를 설정합니다.
3. `enable_versioning = false`와 `true`에서 resource address가 어떻게 달라질지 예상합니다.

## Execute

```bash
terraform init
terraform fmt -check
terraform validate
terraform plan -out=without-versioning.tfplan
terraform show without-versioning.tfplan
```

다음 순서로 실험합니다.

1. Wrong type 또는 허용되지 않은 environment를 넣어 validation failure를 확인합니다.
2. 올바른 값으로 plan을 다시 생성합니다.
3. `enable_versioning`을 바꾸고 `aws_s3_bucket_versioning.versioning[0]` address의 생성 여부를 비교합니다.
4. `tags` map이 `merge()` 결과에 어떻게 반영되는지 console 또는 plan에서 확인합니다.

## Verify and cleanup

```bash
terraform output
terraform output -json
terraform state list
terraform destroy
```

- Output은 resource 전체가 아니라 caller에게 필요한 contract만 노출해야 합니다.
- Sensitive output 표시는 저장 방지와 다르다는 점을 [1.12 deep dive](/reference/terraform-1-12-deep-dive/#sensitive-ephemeral-and-write-only)에서 확인합니다.

**Detailed walkthrough:** [Historical Lab 02](/archive/labs/lab-02-variables-outputs/readme/)  
**Next:** [Lab 03 Data sources](/labs/03-data-sources/) · [Configuration questions](/archive/practice-exams/domain-4-configuration/)
