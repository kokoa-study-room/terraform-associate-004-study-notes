---
title: Lab 10. State 검사와 리팩터링 / State Operations
description: Inspect and refactor disposable state using configuration-driven moved and removed blocks before considering imperative commands.
---

| Level | Time | Objectives |
|---|---:|---|
| Advanced | 50-70 min | 6d, 7a-7c |

**Read first:** [State management](/domains/06-state/), [Maintain infrastructure](/domains/07-maintain/)

## Outcome

Disposable local state에서 address를 검사하고 rename, management removal, import의 binding 변화를 구분합니다. Raw state JSON을 직접 편집하지 않습니다.

:::caution[Disposable state only]
Production state로 연습하지 마세요. 시작 전 `terraform state pull > state-backup.json`을 만들고 backup도 secret으로 취급합니다.
:::

## Inspect without mutation

```bash
terraform state list
terraform state show ADDRESS
terraform show
terraform output -json
```

각 명령이 configuration, state snapshot, remote API 중 무엇을 읽는지 [command matrix](/reference/command-behavior-matrix/#state-inspection-and-mutation)와 대조합니다.

## Rename with configuration

Resource block label을 바꾸고 old/new address를 `moved` block에 기록합니다.

```hcl
moved {
  from = terraform_data.old_name
  to   = terraform_data.new_name
}
```

Plan이 rename만으로 destroy/create를 제안하지 않는지 확인합니다.

## Stop management without destroy

`removed` block과 `destroy = false`를 사용해 remote object를 유지한 채 binding removal을 plan합니다. 같은 의도를 `terraform state rm`으로 수행할 수 있지만 configuration-driven history가 남지 않는 차이를 설명합니다.

## Import boundary

Existing disposable object에 맞는 `resource` configuration과 `import` block을 작성합니다. Import가 configuration을 조직 표준에 맞게 완성해 주지 않으며 address-to-object binding을 추가한다는 점을 plan에서 확인합니다.

## Logging and cleanup

필요한 경우에만 `TF_LOG=DEBUG` 또는 `TRACE`를 짧게 사용하고, log에 credential과 value가 포함될 수 있으므로 종료 후 삭제합니다. Lab 종료 시 configuration과 state가 같은 의도를 표현하는지 확인한 뒤 remote object를 정리합니다.

**Detailed walkthrough:** [Historical Lab 10](/archive/labs/lab-10-state-manipulation/readme/)  
**Next:** [Lab 11 Registry modules](/labs/11-registry-modules/) · [State questions](/archive/practice-exams/domain-6-state/)
