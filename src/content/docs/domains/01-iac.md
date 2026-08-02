---
title: 01. IaC와 Terraform / IaC with Terraform
description: "Objectives 1a-1c: IaC meaning, advantages, and service-agnostic workflows."
---

## 핵심 모델 / Core model

**IaC (Infrastructure as Code)**는 인프라의 목표 상태를 사람이 검토하고 기계가 실행할 수 있는 코드로 관리하는 방식입니다. Terraform 구성은 절차를 나열하기보다 결과를 선언하고, Terraform은 현재 상태와 비교해 변경 계획을 만듭니다.

IaC manages desired infrastructure state as reviewable, machine-executable code. Terraform primarily declares outcomes, compares them with known current state, and proposes the changes needed to converge.

## 1a. What IaC is

- 구성은 version control에서 검토하고 변경 이력을 남길 수 있습니다.
- 같은 입력과 버전 제약으로 환경을 반복 생성할 수 있습니다.
- 코드 자체가 자동화 가능한 운영 문서가 됩니다.

Configuration can be reviewed and versioned, environments can be reproduced from controlled inputs, and the code becomes executable operational documentation.

## 1b. Why IaC patterns help

| Pattern | 이점 / Benefit |
|---|---|
| Declarative configuration | 구현 세부보다 목표 상태에 집중 / focuses on desired state |
| Plan before apply | 변경 영향 검토 / review impact before mutation |
| Reusable modules | 반복과 편차 감소 / reduce repetition and variance |
| Versioned workflow | 감사, 협업, 롤백 판단 / audit and collaboration trail |

:::caution
IaC는 자동으로 idempotency, 보안, 무중단을 보장하지 않습니다. Provider behavior, lifecycle, state, credentials, and review practices still determine safety.
:::

## 1c. Multi-cloud and service-agnostic workflow

Terraform Core는 provider plugin을 통해 서로 다른 API를 동일한 workflow로 다룹니다. 구성 언어와 `init → plan → apply`는 공통이지만, 각 provider의 resource schema와 인증 방식은 다릅니다.

Terraform Core uses provider plugins to apply a common workflow across APIs. The language and workflow are shared; resource schemas, authentication, and remote behavior remain provider-specific.

## 다음 연결 / Why next

IaC의 선언을 실행하려면 누가 API를 호출하고 무엇이 이미 존재하는지 알아야 합니다. 그래서 다음은 [provider와 state](/domains/02-fundamentals/)입니다.

**Official sources:** [Terraform intro v1.12](https://developer.hashicorp.com/terraform/intro/v1.12.x), [Use cases](https://developer.hashicorp.com/terraform/intro/v1.12.x/use-cases)<br />
**Lab:** [Lab 01 First project](/labs/01-first-project/)<br />
**Questions:** [Domain 1 bank](/archive/practice-exams/domain-1-iac-concepts/)
