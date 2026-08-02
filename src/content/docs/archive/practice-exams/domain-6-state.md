---
title: "Domain 6: State Management (16%)"
description: "Legacy study material imported from practice-exams/domain-6-state.md"
---

> **Archived study note / 기존 학습 노트**  
> 이 페이지는 기존 자료를 보존해 웹으로 가져온 문서입니다. 시험 기준은 [공식 목표 맵](/reference/exam-objectives/)과 [교정 노트](/reference/corrections/)를 우선하세요.  
> This page preserves the previous notes. Prefer the [official objective map](/reference/exam-objectives/) and [corrections](/reference/corrections/) when facts differ.

## 📚 도메인 개요

State 파일, Backend, Locking, State 조작 명령어.

---

## 📝 연습 문제

### 문제 1: 🟢 Easy

Terraform State 의 목적이 **아닌** 것은?

- A) 리소스 매핑
- B) 메타데이터 저장
- C) 성능 최적화
- D) Provider 인증

<details><summary>정답 및 해설</summary>

**정답: D**

State: 리소스 매핑, 메타데이터, 성능, 협업.
Provider 인증은 credentials/env.
</details>

### 문제 2: 🔴 Hard

S3 Backend 만으로 State Locking 이 가능한가요?

- A) Yes
- B) No, DynamoDB 필요
- C) Yes, KMS 사용 시
- D) Yes, versioning 활성화 시

<details><summary>정답 및 해설</summary>

**정답: B**

S3 는 자체 locking 미지원. DynamoDB 테이블 필수.
</details>

### 문제 3: 🟡 Medium

DynamoDB Lock Table 의 Primary Key 는?

- A) `id`
- B) `LockID`
- C) `state_lock`
- D) `terraform_lock`

<details><summary>정답 및 해설</summary>

**정답: B**

`LockID` (String).
</details>

### 문제 4: 🟢 Easy

`terraform state list` 는 무엇을 표시?

- A) 모든 provider
- B) 모든 관리 리소스
- C) 실행 이력
- D) State 파일 목록

<details><summary>정답 및 해설</summary>

**정답: B**

State 에 있는 모든 리소스.
</details>

### 문제 5: 🟡 Medium

`terraform state rm aws_instance.web` 의 결과는?

- A) 실제 EC2 인스턴스 삭제
- B) State 에서만 제거 (인스턴스 유지)
- C) Config 파일에서도 제거
- D) 오류 발생

<details><summary>정답 및 해설</summary>

**정답: B**

State 만 제거, 실제 인프라 유지.
</details>

### 문제 6: 🔴 Hard

Backend 종류 중 자체 Locking 을 지원하지 않는 것은?

- A) azurerm
- B) gcs
- C) s3
- D) consul

<details><summary>정답 및 해설</summary>

**정답: C**

S3 만 DynamoDB 필요. 나머지는 native locking.
</details>

### 문제 7: 🟡 Medium

Backend 를 local 에서 s3 로 변경 시 명령어는?

- A) `terraform init`
- B) `terraform init -migrate-state`
- C) `terraform state push`
- D) `terraform apply`

<details><summary>정답 및 해설</summary>

**정답: B**

`-migrate-state` 로 안전하게 이동.
</details>

### 문제 8: 🟢 Easy

**True / False:** Sensitive variable 은 State 파일에 암호화되어 저장된다.

<details><summary>정답 및 해설</summary>

**정답: False**

`sensitive = true` 는 CLI 출력만 마스킹. State 에는 평문.
</details>

### 문제 9: 🟡 Medium

`terraform state mv` 는?

- A) 실제 인프라 이동
- B) State 내 리소스 이름 변경/이동
- C) Backend 변경
- D) State 파일 백업

<details><summary>정답 및 해설</summary>

**정답: B**

State 내에서만 조작. 실제 인프라 영향 없음.
</details>

### 문제 10: 🔴 Hard

`moved` block (Terraform 1.1+) 의 목적은?

- A) State 이동을 코드로 선언
- B) State 삭제
- C) Backend 이동
- D) Provider 이동

<details><summary>정답 및 해설</summary>

**정답: A**

`terraform state mv` 의 declarative 대체.
</details>

### 문제 11: 🟡 Medium

`import` block (Terraform 1.5+) 예제:

```hcl
import {
  to = aws_instance.web
  id = "i-1234"
}
```

기존 `terraform import` CLI 와 차이는?

- A) CLI 방식만 사용 가능
- B) HCL 로 선언, 코드에 저장
- C) 성능 차이
- D) 동일

<details><summary>정답 및 해설</summary>

**정답: B**

Import block 은 코드에 저장, PR 리뷰 가능, config generation 지원.
</details>

### 문제 12: 🟢 Easy

`terraform state pull` 은?

- A) State 편집
- B) Remote state 를 로컬로 다운로드
- C) State 삭제
- D) State 재생성

<details><summary>정답 및 해설</summary>

**정답: B**

백업 용도로 자주 사용.
</details>

### 문제 13: 🔴 Hard

`force-unlock` 명령어의 위험성은?

- A) State 손상 위험
- B) 다른 사용자 apply 중이면 충돌
- C) 인프라 삭제
- D) A 와 B

<details><summary>정답 및 해설</summary>

**정답: D**

Stale lock 확실할 때만 사용. 다른 사람 작업 중이면 심각한 문제.
</details>

### 문제 14: 🟡 Medium

Backend 변경 후 명령어는? (State 이동 없이)

- A) `terraform init -migrate-state`
- B) `terraform init -reconfigure`
- C) `terraform apply`
- D) `terraform init -upgrade`

<details><summary>정답 및 해설</summary>

**정답: B**

`-reconfigure` 는 state 옮기지 않음 (기존 state 잊음, 위험).
</details>

### 문제 15: 🟢 Easy

Drift 란?

- A) State 와 실제 인프라의 불일치
- B) Terraform version 차이
- C) Provider version 차이
- D) Network 오류

<details><summary>정답 및 해설</summary>

**정답: A**

수동 변경 등으로 State ≠ 실제 인프라.
</details>

### 문제 16: 🔴 Hard

Drift 해결 방법 4가지가 아닌 것은?

- A) `terraform apply` (config 우선)
- B) Config 업데이트 (real 수용)
- C) `terraform apply -refresh-only`
- D) State 파일 수동 편집

<details><summary>정답 및 해설</summary>

**정답: D**

State 수동 편집은 금지! `terraform state` 명령어로만.
</details>

### 문제 17: 🟡 Medium

**True / False:** `terraform destroy` 는 State 파일도 삭제한다.

<details><summary>정답 및 해설</summary>

**정답: False**

리소스만 삭제, State 파일은 유지 (empty state).
</details>

### 문제 18: 🟢 Easy

S3 Backend 암호화 활성화:

```hcl
backend "s3" {
  encrypt = true
}
```

이는 무엇을 의미?

- A) In-transit 암호화
- B) At-rest 암호화 (SSE)
- C) Client-side 암호화
- D) DynamoDB 암호화

<details><summary>정답 및 해설</summary>

**정답: B**

Server-Side Encryption (S3 저장 시 암호화).
</details>

### 문제 19: 🔴 Hard

`removed` block (Terraform 1.7+):

```hcl
removed {
  from = aws_instance.legacy
  lifecycle {
    destroy = false
  }
}
```

동작은?

- A) 실제 인스턴스 삭제
- B) State 에서만 제거, 인스턴스 유지
- C) Config 에서 삭제
- D) 오류

<details><summary>정답 및 해설</summary>

**정답: B**

`destroy = false` 로 State 만 제거.
`destroy = true` (기본) 면 실제 삭제.
</details>

### 문제 20: 🟡 Medium

HCP Terraform 은 자체 Locking 을 제공하나요?

<details><summary>정답 및 해설</summary>

**정답: True**

HCP Workspace 는 기본 locking 제공.
</details>

### 문제 21: 🟢 Easy

Backend 초기화 후 backend 를 변경하면?

- A) 자동 마이그레이션
- B) `terraform init` 재실행 필요
- C) 오류
- D) 무시됨

<details><summary>정답 및 해설</summary>

**정답: B**

`terraform init` (또는 -migrate-state / -reconfigure) 필요.
</details>

### 문제 22: 🔴 Hard

`terraform state show <resource> -json` 이 반환하는 것은?

- A) State 전체
- B) 특정 리소스 상세 (JSON)
- C) 리소스 이름 목록
- D) Provider 정보

<details><summary>정답 및 해설</summary>

**정답: B**

JSON 형식으로 특정 리소스 attributes.
</details>

### 문제 23: 🟡 Medium

.gitignore 에 포함되어야 하는 파일이 **아닌** 것은?

- A) `*.tfstate`
- B) `*.tfstate.backup`
- C) `.terraform.lock.hcl`
- D) `.terraform/`

<details><summary>정답 및 해설</summary>

**정답: C**

Lock file 은 **커밋** 해야 함. 나머지는 gitignore.
</details>

### 문제 24: 🟢 Easy

`terraform state list "module.vpc.*"` 는?

- A) VPC 리소스만 표시
- B) module.vpc 내 모든 리소스
- C) 오류
- D) 빈 결과

<details><summary>정답 및 해설</summary>

**정답: B**

Address pattern 으로 필터.
</details>

### 문제 25: 🔴 Hard

Multi-team 협업 시 State 관리 Best Practice 는? (**Select TWO**)

- A) Remote Backend 사용
- B) State Locking 활성화
- C) 각자 로컬 State
- D) State 파일 이메일 공유

<details><summary>정답 및 해설</summary>

**정답: A, B**

Remote Backend + Locking. 나머지는 절대 금지.
</details>

### 문제 26: 🟡 Medium

`terraform_remote_state` 로 다른 프로젝트의 무엇을 참조?

- A) Resources 직접
- B) Outputs 만
- C) Variables
- D) 모든 것

<details><summary>정답 및 해설</summary>

**정답: B**

Outputs 만 접근 가능. Resource attribute 는 원본 state 에서 output 으로 노출 필요.
</details>

### 문제 27: 🟢 Easy

**True / False:** `terraform.tfstate.backup` 은 자동 생성된다.

<details><summary>정답 및 해설</summary>

**정답: True**

이전 state 자동 백업.
</details>

### 문제 28: 🔴 Hard

Refresh 명령어의 현재 상태는?

- A) 사용 가능
- B) Deprecated → `apply -refresh-only`
- C) 제거됨
- D) Alpha

<details><summary>정답 및 해설</summary>

**정답: B**

Deprecated. 대체: `terraform apply -refresh-only`.
</details>

### 문제 29: 🟡 Medium

Partial backend configuration 예제:

```hcl
terraform {
  backend "s3" {
    # 값 없음
  }
}
```

값은 어떻게 제공?

- A) Config 없이 사용
- B) `-backend-config` CLI 옵션
- C) 환경 변수만
- D) 불가능

<details><summary>정답 및 해설</summary>

**정답: B**

`terraform init -backend-config="bucket=my-tfstate"` 또는 파일.
</details>

### 문제 30: 🟢 Easy

S3 backend 의 필수 arguments 는? (**Select THREE**)

- A) bucket
- B) key
- C) region
- D) encrypt
- E) dynamodb_table

<details><summary>정답 및 해설</summary>

**정답: A, B, C**

필수: bucket, key, region. 나머지는 선택 (권장).
</details>

---

## 🎯 핵심 개념 정리

1. **S3 Backend + DynamoDB = Locking**
2. **`sensitive` 는 CLI 만 마스킹**
3. **State 명령어:** list, show, mv, rm, pull, push
4. **Deprecated:** `taint` → `apply -replace`, `refresh` → `apply -refresh-only`
5. **Block 방식 (신):** moved, removed, import
6. **Backend 변경:** `-migrate-state` (안전) vs `-reconfigure` (위험)
7. **Drift 해결 3방법:** apply, config update, refresh-only

---

## 📚 관련 학습 자료

- [State Management](/archive/06-state/readme/)
- [Remote Backend](/archive/06-state/remote-backend/)
- [State Locking](/archive/06-state/state-locking/)
- [State 명령어](/archive/06-state/state-commands/)
- [Drift Detection](/archive/06-state/drift-detection/)
