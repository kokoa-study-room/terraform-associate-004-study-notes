---
title: 시험 대비 최종 정리 / Exam Readiness
description: A final objective-by-objective review connecting concepts, labs, behavior boundaries, and the canonical question bank.
---

시험 준비 완료 여부를 점수 하나로 판단하지 마세요. 각 objective의 동작을 설명하고, 관련 Lab에서 관찰하고, 오답을 공식 문서로 교정할 수 있어야 합니다.

## Readiness map

| Domain | Explain without notes | Prove in a Lab | Practice |
|---|---|---|---|
| 1. IaC | declarative intent, reviewability, multi-provider workflow | [Lab 01](/labs/01-first-project/) | [20 questions](/archive/practice-exams/domain-1-iac-concepts/) |
| 2. Fundamentals | provider requirement/configuration, alias, lock file, state binding | [Lab 01](/labs/01-first-project/) | [20 questions](/archive/practice-exams/domain-2-terraform-fundamentals/) |
| 3. Workflow | write/init/validate/plan/apply/destroy and saved plans | [Lab 01](/labs/01-first-project/) | [25 questions](/archive/practice-exams/domain-3-core-workflow/) |
| 4. Configuration | resource/data, types, expressions, dependencies, conditions, secrets | [Labs 02-09](/labs/) | [35 questions](/archive/practice-exams/domain-4-configuration/) |
| 5. Modules | source, scope, composition, version selection | [Labs 05 and 11](/labs/05-modules/) | [25 questions](/archive/practice-exams/domain-5-modules/) |
| 6. State | backend, locking, migration, drift, moved/removed | [Labs 06 and 10](/labs/06-remote-state/) | [30 questions](/archive/practice-exams/domain-6-state/) |
| 7. Maintain | import, state inspection, verbose logging | [Lab 10](/labs/10-state-operations/) | [25 questions](/archive/practice-exams/domain-7-maintain/) |
| 8. HCP Terraform | runs, workspace/project, auth, governance, integrations | [Lab 12](/labs/12-hcp-terraform/) | [20 questions](/archive/practice-exams/domain-8-hcp-terraform/) |

## High-value boundaries

### Provider, backend, module

- Provider implements resource/data types and calls target APIs.
- Backend stores state and may coordinate locking.
- Module groups configuration behind input/output contracts.

### Configuration, state, remote object

- Configuration declares desired behavior.
- State records address-to-object bindings and known attributes.
- Provider reads and changes remote objects.
- A state command can change a binding without changing the object, which affects the next plan.

### Command phases

- `fmt`: canonical source formatting
- `validate`: configuration syntax and internal consistency
- `plan`: proposed convergence using run context
- `apply`: execute a new or saved plan
- refresh-only: update recorded state/output without proposing remote mutation

Review the full [command behavior matrix](/reference/command-behavior-matrix/).

### Secret handling

- `sensitive`: redact display; value can remain in plan/state
- `ephemeral`: omit supported values from plan/state
- write-only argument: provider-defined non-persisted resource input
- Dynamic credential: short-lived target-platform authorization, separate from HCP login

Review [Terraform 1.12 deep dive](/reference/terraform-1-12-deep-dive/) and [HCP boundaries](/reference/hcp-boundaries/).

## Final seven-day loop

| Day | Work |
|---|---|
| 1 | Domains 1-3 recall, Lab 01, related questions |
| 2 | Domain 4 values/types, Labs 02-04, configuration questions |
| 3 | Domain 4 lifecycle/conditions, Labs 07-09 |
| 4 | Domain 5, Labs 05/11, module questions |
| 5 | Domains 6-7, Labs 06/10, state and maintain questions |
| 6 | Domain 8, Lab 12, HCP questions |
| 7 | [24-question diagnostic](/practice/strategy/), official-source correction, rest |

## Final checklist

- [ ] Official objectives 1a-8d를 자신의 말로 설명할 수 있다.
- [ ] Provider constraint와 lock selection을 구분할 수 있다.
- [ ] Plan action과 resource address를 읽을 수 있다.
- [ ] `count` index와 `for_each` key의 state impact를 설명할 수 있다.
- [ ] Sensitive, ephemeral, write-only의 저장 차이를 설명할 수 있다.
- [ ] S3 `use_lockfile`과 deprecated DynamoDB locking을 구분한다.
- [ ] Import, moved, removed, state rm의 binding 효과를 구분한다.
- [ ] HCP workspace/project와 세 authentication boundary를 구분한다.
- [ ] 틀린 문제마다 정답뿐 아니라 distractor가 틀린 이유를 설명한다.

HashiCorp는 official content list에 domain weight나 passing score를 공개하지 않습니다. 이 checklist와 재현 가능한 Lab 결과를 readiness evidence로 사용하세요.
