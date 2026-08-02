---
title: 실습과 예제 파일 / Labs and Practice Files
description: Discover the twelve guided labs and download the safe Terraform example files included in the project.
---

## 순서대로 실습 / Guided labs

모든 Lab 설명은 검색 가능한 Archive 페이지로 제공됩니다. 각 실습은 [학습 순서](/guide/learning-path/)의 관련 개념을 읽은 뒤 진행하세요.

All lab guides are available as searchable archive pages. Complete each lab after its prerequisite lesson in the [learning path](/guide/learning-path/).

| Level | Labs | Guide |
|---|---|---|
| Beginner | 01 First project, 02 Variables/outputs, 03 Data sources | [Lab overview](/archive/labs/readme/) |
| Intermediate | 04 `count`/`for_each`, 05 Module, 06 Remote state, 07 Lifecycle | [Lab 04](/archive/labs/lab-04-count-for-each/readme/) |
| Advanced | 08 Conditions, 09 Dynamic blocks, 10 State, 11 Registry, 12 HCP Terraform | [Lab 08](/archive/labs/lab-08-custom-conditions/readme/) |

## 다운로드 가능한 솔루션 / Downloadable solutions

현재 원본 프로젝트에 실제 solution 파일이 존재하는 Lab만 제공합니다. Labs 04-12는 상세 가이드는 있지만 완성된 solution directory가 없으므로 존재한다고 표시하지 않습니다.

Only labs with real source solution files are listed. Labs 04-12 include guides but no complete solution directories in the source project.

### Lab 01

- [providers.tf](/lab-files/lab-01-first-project/solution/providers.tf)
- [main.tf](/lab-files/lab-01-first-project/solution/main.tf)
- [outputs.tf](/lab-files/lab-01-first-project/solution/outputs.tf)

### Lab 02

- [variables.tf](/lab-files/lab-02-variables-outputs/solution/variables.tf)
- [main.tf](/lab-files/lab-02-variables-outputs/solution/main.tf)
- [outputs.tf](/lab-files/lab-02-variables-outputs/solution/outputs.tf)
- [terraform.tfvars.example](/lab-files/lab-02-variables-outputs/solution/terraform.tfvars.example)

### Lab 03

- [providers.tf](/lab-files/lab-03-data-sources/solution/providers.tf)
- [data.tf](/lab-files/lab-03-data-sources/solution/data.tf)
- [main.tf](/lab-files/lab-03-data-sources/solution/main.tf)
- [outputs.tf](/lab-files/lab-03-data-sources/solution/outputs.tf)

## Hello world practice

`practices/terraform-hello-world`에서 안전한 구성과 dependency lock file만 공개합니다. State와 provider cache는 민감 정보와 대용량 binary가 포함될 수 있어 의도적으로 제외합니다.

Only safe configuration artifacts are published from the local hello-world practice. State and provider caches are intentionally excluded.

- [main.tf](/practice-files/terraform-hello-world/main.tf)
- [.terraform.lock.hcl](/practice-files/terraform-hello-world/.terraform.lock.hcl)
