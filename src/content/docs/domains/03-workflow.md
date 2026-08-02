---
title: 03. 핵심 워크플로우 / Core Workflow
description: "Objectives 3a-3g: write, init, validate, plan, apply, destroy, and fmt."
---

## 전체 흐름 / End-to-end flow

```text
Write -> fmt -> init -> validate -> plan -> review -> apply -> observe
                                                          -> destroy (when intended)
```

The workflow is a chain of artifacts. Configuration and lock constraints feed initialization; initialized schemas enable validation; configuration plus prior state plus refreshed remote data produce a plan; apply executes an approved plan and writes new state.

## 명령별 책임 / Command responsibilities

| Command | Primary responsibility | 자주 혼동하는 점 / Common confusion |
|---|---|---|
| `terraform fmt` | Canonical style | 의미나 provider API 유효성을 검증하지 않음 |
| `terraform init` | Backend/module/provider initialization | 리소스를 생성하지 않음 |
| `terraform validate` | Internal syntax/type consistency | Remote API existence를 보장하지 않음 |
| `terraform plan` | Proposed change set | Apply 전까지 실제 객체를 변경하지 않음 |
| `terraform apply` | Execute changes and update state | Saved plan 사용 시 그 plan을 적용 |
| `terraform destroy` | Plan/apply deletion of managed objects | State 밖 객체는 대상이 아님 |

## Saved plan pattern

```bash
terraform plan -out=tfplan
terraform show tfplan
terraform apply tfplan
```

Saved plan은 검토한 변경과 적용할 변경 사이의 불일치를 줄입니다. Automation에서는 exit code와 non-interactive options를 목적에 맞게 사용하되, `-auto-approve`를 안전성 자체로 오해하지 않습니다.

## Dependency graph

Expression reference가 graph edge를 만들며, Terraform은 독립 노드를 병렬 처리할 수 있습니다. `depends_on`은 expression으로 표현되지 않는 숨은 의존성이 있을 때만 사용합니다.

Expression references create graph edges. Use `depends_on` only for hidden dependencies that data flow cannot express.

## 다음 연결 / Why next

Workflow가 읽는 입력은 Terraform configuration입니다. 다음 단계에서 [HCL block, expression, type, dependency](/domains/04-configuration/)를 연결합니다.

**Official sources:** [Core workflow](https://developer.hashicorp.com/terraform/intro/v1.12.x/core-workflow), [`init`](https://developer.hashicorp.com/terraform/cli/v1.12.x/commands/init), [`plan`](https://developer.hashicorp.com/terraform/cli/v1.12.x/commands/plan), [`apply`](https://developer.hashicorp.com/terraform/cli/v1.12.x/commands/apply)  
**Detailed archive:** [CLI command guide](/archive/03-core-workflow/cli-commands/)
