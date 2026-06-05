window.WORK_TRACE_DATA = {
  "schema_version": 1,
  "generated_at": "2026-06-05T10:10:17.080Z",
  "trace": {
    "exists": true,
    "initialized": true,
    "root": "personal-work-trace",
    "user": {
      "department": {
        "category": "Engineering",
        "confidence": 0.9
      },
      "role": {
        "title": "Engineer",
        "team": "Payment Ops Tooling",
        "squad": "Regional Platform",
        "tribe": "Regional Expansion",
        "company": "Wise"
      },
      "timezone": {
        "local": "Europe/Tallinn"
      }
    },
    "date_range": {
      "start": "2026-06-01",
      "end": "2026-06-05"
    }
  },
  "stats": {
    "daily_record_count": 5,
    "event_count": 22,
    "project_count": 10,
    "role_count": 3,
    "source_gap_count": 7,
    "followup_count": 25,
    "risk_count": 10
  },
  "dailyRecords": [
    {
      "date": "2026-06-01",
      "confidence": 0.74,
      "event_count": 4,
      "projects_touched": {
        "support-and-on-call": 2,
        "configurable-queue": 1
      },
      "unclassified_event_count": 1,
      "source_gaps": [
        "calendar_event_listing_unavailable",
        "manual_supplement_not_provided",
        "github_no_date_specific_delivery_evidence"
      ],
      "executive_summary": "Slack evidence shows the week started with payment-defects-incidents on-call coverage, PDI support triage, and configurable queue/routing discussion. Evidence is mostly Slack-backed; no GitHub delivery evidence was found for this date.",
      "delta": "First record in this backfill range; no previous daily record to compare.",
      "sources_covered": {
        "github": false,
        "jira": true,
        "slack": true,
        "confluence": true,
        "google_calendar": false,
        "google_meet": false,
        "gmail": false
      },
      "path": "daily/2026/06/2026-06-01.md"
    },
    {
      "date": "2026-06-02",
      "confidence": 0.79,
      "event_count": 5,
      "projects_touched": {
        "configurable-queue": 2,
        "automating-ops-tasks": 1,
        "retry-volume-control": 1
      },
      "unclassified_event_count": 1,
      "source_gaps": [
        "calendar_event_listing_unavailable",
        "manual_supplement_not_provided",
        "github_no_date_specific_delivery_evidence"
      ],
      "executive_summary": "The strongest evidence for the day is Slack-backed planning and support work around configurable queue cleanup, offline/JEXL validation, PayOps automation framework direction, retry-control support, and system alert forwarding. GitHub delivery evidence was not found for this date.",
      "delta": "Configurable queue moved from catch-all/system-alert discussion into cleanup planning and potential validation tooling.\nAutomation framework became a visible planning thread.",
      "sources_covered": {
        "github": false,
        "jira": true,
        "slack": true,
        "confluence": true,
        "google_calendar": false,
        "google_meet": false,
        "gmail": false
      },
      "path": "daily/2026/06/2026-06-02.md"
    },
    {
      "date": "2026-06-03",
      "confidence": 0.85,
      "event_count": 6,
      "projects_touched": {
        "support-and-on-call": 4,
        "configurable-queue": 2
      },
      "unclassified_event_count": 0,
      "source_gaps": [
        "calendar_event_listing_unavailable",
        "manual_supplement_not_provided",
        "full_jira_changelog_not_available"
      ],
      "executive_summary": "This was a strong delivery and support day. GitHub evidence shows merged work in self-service and Samurai, while Slack evidence shows active PDIOC support around workflow-ui document deletion, balance-withdrawal self-assignment, compliance remediation alerts, and M2E auto-cancel behavior.",
      "delta": "Work shifted from planning-heavy traces to concrete support fixes and merged delivery.",
      "sources_covered": {
        "github": true,
        "jira": true,
        "slack": true,
        "confluence": true,
        "google_calendar": false,
        "google_meet": false,
        "gmail": false
      },
      "path": "daily/2026/06/2026-06-03.md"
    },
    {
      "date": "2026-06-04",
      "confidence": 0.86,
      "event_count": 5,
      "projects_touched": {
        "support-and-on-call": 2,
        "cross-team-escalations-zd-ddcase": 2,
        "extra-money-payouts": 1
      },
      "unclassified_event_count": 0,
      "source_gaps": [
        "calendar_event_listing_unavailable",
        "manual_supplement_not_provided",
        "full_jira_changelog_not_available"
      ],
      "executive_summary": "The day combined support delivery, cross-team escalation/ZD sync design work, EMPOI architecture discussion, and GSO support triage. GitHub evidence confirms merged fixes in dd-case and plugin-twilio-flex.",
      "delta": "Support work continued, while cross-team escalation and EMPOI architecture discussions became more prominent.",
      "sources_covered": {
        "github": true,
        "jira": true,
        "slack": true,
        "confluence": true,
        "google_calendar": false,
        "google_meet": false,
        "gmail": false
      },
      "path": "daily/2026/06/2026-06-04.md"
    },
    {
      "date": "2026-06-05",
      "confidence": 0.72,
      "event_count": 2,
      "projects_touched": {
        "support-and-on-call": 1,
        "work-memory": 1
      },
      "unclassified_event_count": 0,
      "source_gaps": [
        "midday_partial_record",
        "calendar_event_listing_unavailable",
        "manual_supplement_not_provided",
        "github_no_date_specific_delivery_evidence"
      ],
      "executive_summary": "Available evidence for the partial day shows PDI support items marked fixed and work-memory plugin initiali",
      "delta": "Work shifted from delivery/design discussion toward support closure and work-memory initiali",
      "sources_covered": {
        "github": false,
        "jira": false,
        "slack": true,
        "confluence": false,
        "google_calendar": false,
        "google_meet": false,
        "gmail": false
      },
      "path": "daily/2026/06/2026-06-05.md"
    }
  ],
  "events": [
    {
      "id": "evt_2026-06-01_slack_oncall_start",
      "date": "2026-06-01",
      "timestamp": "2026-06-01T04:00:00+03:00",
      "source": "slack",
      "action_type": "on_call_shift_started",
      "title": "payment-defects-incidents on-call shift started",
      "summary": "Received Rootly notification that the payment-defects-incidents main on-call shift started on 2026-06-01 at 09:00 Asia/Singapore.",
      "project_id": "support-and-on-call",
      "project_role": "unknown",
      "role_confidence": null,
      "role_reason": null,
      "confidence": 0.9,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 1,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-01.events.jsonl"
    },
    {
      "id": "evt_2026-06-01_slack_pdi_support_ack",
      "date": "2026-06-01",
      "timestamp": "2026-06-01T12:00:00+03:00",
      "source": "slack",
      "action_type": "support_request_acknowledged",
      "title": "PDI support request acknowledged",
      "summary": "Acknowledged at least one PDI help request and created a Teleperformance PayOps tooling Jira ticket from Slack.",
      "project_id": "support-and-on-call",
      "project_role": "unknown",
      "role_confidence": null,
      "role_reason": null,
      "confidence": 0.82,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 1,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-01.events.jsonl"
    },
    {
      "id": "evt_2026-06-01_slack_config_queue_system_alert",
      "date": "2026-06-01",
      "timestamp": "2026-06-01T15:00:00+03:00",
      "source": "slack",
      "action_type": "project_discussion",
      "title": "Configurable queue catch-all/system alert discussion",
      "summary": "Discussed configurable queue behavior, including whether system alert cases should be excluded from a catch-all queue and whether LLM/JEXL tooling could help organize queue configurations.",
      "project_id": "configurable-queue",
      "project_role": "core_contributor",
      "role_confidence": "high",
      "role_reason": "Inherited from the normalized project record.",
      "confidence": 0.87,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 1,
      "decisions": [],
      "followups": [
        {
          "id": "fu_2026-06-01_config_queue_system_alert",
          "summary": "Confirm whether system alert cases should be excluded from catch-all queues."
        }
      ],
      "risks": [],
      "path": "events/2026/06/2026-06-01.events.jsonl"
    },
    {
      "id": "evt_2026-06-01_slack_ninjas_deprecation_review",
      "date": "2026-06-01",
      "timestamp": "2026-06-01T16:00:00+03:00",
      "source": "slack",
      "action_type": "code_review_or_context_reply",
      "title": "Ninjas deprecation context in PR/dev channel",
      "summary": "Participated in a payment-ops-tooling-dev discussion about behavior that might be removed during Ninjas deprecation.",
      "project_id": "webapp-ninjas-migration",
      "project_role": "side_helper",
      "role_confidence": "medium",
      "role_reason": "Inherited from the normalized project record.",
      "confidence": 0.76,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 1,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-01.events.jsonl"
    },
    {
      "id": "evt_2026-06-02_slack_config_queue_cleanup",
      "date": "2026-06-02",
      "timestamp": "2026-06-02T10:00:00+03:00",
      "source": "slack",
      "action_type": "project_planning",
      "title": "Configurable queue cleanup and old-config removal",
      "summary": "Asked about removing old PayOps queue configs and using the config queue team-group column, offering to split/help with the task.",
      "project_id": "configurable-queue",
      "project_role": "core_contributor",
      "role_confidence": "high",
      "role_reason": "Inherited from the normalized project record.",
      "confidence": 0.91,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 1,
      "decisions": [],
      "followups": [
        {
          "id": "fu_2026-06-02_config_queue_cleanup_split",
          "summary": "Split or coordinate old-config removal work with Michelle."
        }
      ],
      "risks": [],
      "path": "events/2026/06/2026-06-02.events.jsonl"
    },
    {
      "id": "evt_2026-06-02_slack_jexl_verifier_idea",
      "date": "2026-06-02",
      "timestamp": "2026-06-02T11:00:00+03:00",
      "source": "slack",
      "action_type": "analysis",
      "title": "JEXL verifier idea for queue routing",
      "summary": "Explored the idea of a Java repository/tool to run JEXL routing expressions for configurable queue validation.",
      "project_id": "configurable-queue",
      "project_role": "core_contributor",
      "role_confidence": "high",
      "role_reason": "Inherited from the normalized project record.",
      "confidence": 0.86,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 1,
      "decisions": [],
      "followups": [
        {
          "id": "fu_2026-06-02_jexl_verifier",
          "summary": "Think through local/offline JEXL validation design for queue routing."
        }
      ],
      "risks": [],
      "path": "events/2026/06/2026-06-02.events.jsonl"
    },
    {
      "id": "evt_2026-06-02_slack_automation_framework",
      "date": "2026-06-02",
      "timestamp": "2026-06-02T14:00:00+03:00",
      "source": "slack",
      "action_type": "project_planning",
      "title": "PayOps automation framework RFC shared",
      "summary": "Shared the PayOps Automation Process Paradigm and Framework Capabilities RFC with Amanda and discussed whether to pursue that framework direction.",
      "project_id": "automating-ops-tasks",
      "project_role": "core_contributor",
      "role_confidence": "high",
      "role_reason": "Inherited from the normalized project record.",
      "confidence": 0.88,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [
        {
          "id": "fu_2026-06-02_automation_framework_decision",
          "summary": "Clarify whether the team should invest in the automation framework direction."
        }
      ],
      "risks": [
        {
          "id": "risk_2026-06-02_framework_ambiguity",
          "summary": "Framework scope and ownership remained unsettled based on Slack discussion."
        }
      ],
      "path": "events/2026/06/2026-06-02.events.jsonl"
    },
    {
      "id": "evt_2026-06-02_slack_retry_control_support",
      "date": "2026-06-02",
      "timestamp": "2026-06-02T15:00:00+03:00",
      "source": "slack",
      "action_type": "support_analysis",
      "title": "Retry-control POI-count support explanation",
      "summary": "Helped explain retry-control alert behavior: detected POIs in the window can differ from suspended transfers shown in CSV/downloads.",
      "project_id": "retry-volume-control",
      "project_role": "side_helper",
      "role_confidence": "medium",
      "role_reason": "Inherited from the normalized project record.",
      "confidence": 0.84,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 1,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-02.events.jsonl"
    },
    {
      "id": "evt_2026-06-02_slack_system_alert_forwarding",
      "date": "2026-06-02",
      "timestamp": "2026-06-02T16:00:00+03:00",
      "source": "slack",
      "action_type": "requirements_question",
      "title": "System-alert case forwarding consultation",
      "summary": "Asked whether system alert cases can be forwarded to other teams and who should be consulted.",
      "project_id": "configurable-queue",
      "project_role": "core_contributor",
      "role_confidence": "high",
      "role_reason": "Inherited from the normalized project record.",
      "confidence": 0.72,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 1,
      "decisions": [],
      "followups": [
        {
          "id": "fu_2026-06-02_system_alert_forwarding",
          "summary": "Find the right owner/consultant for system alert case forwarding policy."
        }
      ],
      "risks": [],
      "path": "events/2026/06/2026-06-02.events.jsonl"
    },
    {
      "id": "evt_2026-06-03_github_self_service_pdioc_649",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T10:55:44+03:00",
      "source": "github",
      "action_type": "commit_authored_or_merged",
      "title": "PDIOC-649 handle empty ADS error responses (#3057)",
      "summary": "Delivered or merged the self-service fix for blank ADS error responses so empty 4xx bodies no longer break profile-switch cleanup handling.",
      "project_id": "support-and-on-call",
      "project_role": "unknown",
      "role_confidence": null,
      "role_reason": null,
      "confidence": 0.82,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-03.events.jsonl"
    },
    {
      "id": "evt_2026-06-03_slack_balance_withdrawal_pdioc_655",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T13:00:00+03:00",
      "source": "slack",
      "action_type": "debugging_discussion",
      "title": "Balance withdrawal self-assignment investigation",
      "summary": "Investigated a balance-withdrawal/manual-authorisation issue where a workflow-created ticket appeared to be assigned back to the requester, and discussed possible root cause and handling.",
      "project_id": "support-and-on-call",
      "project_role": "unknown",
      "role_confidence": null,
      "role_reason": null,
      "confidence": 0.84,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 1,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-03.events.jsonl"
    },
    {
      "id": "evt_2026-06-03_slack_workflow_ui_pdioc_652",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T14:00:00+03:00",
      "source": "slack",
      "action_type": "support_fix_shared",
      "title": "PDIOC-652 workflow-ui fix shared",
      "summary": "Started working on PDIOC-652 and shared workflow-ui PR 2809 for review to fix safe rendering of document deletion errors.",
      "project_id": "support-and-on-call",
      "project_role": "unknown",
      "role_confidence": null,
      "role_reason": null,
      "confidence": 0.86,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [
        {
          "id": "fu_2026-06-03_workflow_ui_review",
          "summary": "Get workflow-ui PR 2809 reviewed."
        }
      ],
      "risks": [],
      "path": "events/2026/06/2026-06-03.events.jsonl"
    },
    {
      "id": "evt_2026-06-03_github_samurai_backlog_v1",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T15:31:42+03:00",
      "source": "github",
      "action_type": "commit_authored_or_merged",
      "title": "[POT-2391] chore: deprecate backlog v1 (#1678)",
      "summary": "Merged the Samurai side of PayOps backlog v1 deprecation, keeping Routine backlog on the v2 path.",
      "project_id": "configurable-queue",
      "project_role": "core_contributor",
      "role_confidence": "high",
      "role_reason": "Inherited from the normalized project record.",
      "confidence": 0.78,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-03.events.jsonl"
    },
    {
      "id": "evt_2026-06-03_github_samurai_wfm_plan",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T15:56:26+03:00",
      "source": "github",
      "action_type": "documentation_updated",
      "title": "docs: add case assignment WFM refactor plan (#1677)",
      "summary": "Added the Routine case assignment and WFM status refactor plan documentation to Samurai.",
      "project_id": "configurable-queue",
      "project_role": "core_contributor",
      "role_confidence": "high",
      "role_reason": "Inherited from the normalized project record.",
      "confidence": 0.8,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-03.events.jsonl"
    },
    {
      "id": "evt_2026-06-03_slack_m2e_auto_cancel_research",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T16:30:00+03:00",
      "source": "slack",
      "action_type": "research_answered",
      "title": "Money-to-email auto-cancel timing research",
      "summary": "Researched and answered that money-to-email auto-cancel timing is 10 working days, the old 7-day webapp config is no longer in use, and docs should be updated.",
      "project_id": "support-and-on-call",
      "project_role": "unknown",
      "role_confidence": null,
      "role_reason": null,
      "confidence": 0.82,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 1,
      "decisions": [
        {
          "id": "decision_2026-06-03_m2e_auto_cancel",
          "summary": "M2E auto-cancel timing should be treated as 10 working days; old 7-day webapp config is not used."
        }
      ],
      "followups": [
        {
          "id": "fu_2026-06-03_m2e_doc_update",
          "summary": "Update documentation to reflect 10-working-day auto-cancel behavior."
        },
        {
          "id": "fu_2026-06-03_webapp_dead_code",
          "summary": "Consider removing unused old 7-day webapp config/dead code later."
        }
      ],
      "risks": [],
      "path": "events/2026/06/2026-06-03.events.jsonl"
    },
    {
      "id": "evt_2026-06-04_github_ddcase_pdioc_653",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T10:41:24+03:00",
      "source": "github",
      "action_type": "commit_authored_or_merged",
      "title": "[PDIOC-653] fix: support suspended transfer delay minutes (#12664)",
      "summary": "Delivered or merged a dd-case fix allowing suspended transfer auto-snooze configuration to support delay minutes.",
      "project_id": "support-and-on-call",
      "project_role": "unknown",
      "role_confidence": null,
      "role_reason": null,
      "confidence": 0.81,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-04.events.jsonl"
    },
    {
      "id": "evt_2026-06-04_slack_zd_sync_custom_fields",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T11:00:00+03:00",
      "source": "slack",
      "action_type": "requirements_discussion",
      "title": "ZD sync custom-field extraction discussion",
      "summary": "Discussed ZD sync/custom-field extraction, including whether to fetch custom fields to populate transfer ID and whether contact-side contract changes or capacity were needed.",
      "project_id": "cross-team-escalations-zd-ddcase",
      "project_role": "core_contributor",
      "role_confidence": "high",
      "role_reason": "Inherited from the normalized project record.",
      "confidence": 0.9,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [
        {
          "id": "fu_2026-06-04_zd_custom_fields",
          "summary": "Verify whether ZD custom fields can be fetched and mapped to transfer ID."
        },
        {
          "id": "fu_2026-06-04_contact_contract",
          "summary": "Confirm whether contact-side event contract changes are needed before implementation."
        }
      ],
      "risks": [
        {
          "id": "risk_2026-06-04_zd_sync_capacity",
          "summary": "Discussion suggested the work may need to wait for contact-side owner/manpower."
        }
      ],
      "path": "events/2026/06/2026-06-04.events.jsonl"
    },
    {
      "id": "evt_2026-06-04_github_twilio_pot_2411",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T13:57:22+03:00",
      "source": "github",
      "action_type": "commit_authored_or_merged",
      "title": "fix(POT-2411): track send warning on final escalation 9.14.11 (#3038)",
      "summary": "Delivered or merged the final Send Case warning-tracking fix in plugin-twilio-flex for POT-2411.",
      "project_id": "cross-team-escalations-zd-ddcase",
      "project_role": "core_contributor",
      "role_confidence": "high",
      "role_reason": "Inherited from the normalized project record.",
      "confidence": 0.79,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-04.events.jsonl"
    },
    {
      "id": "evt_2026-06-04_slack_empoi_internal_account",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T14:30:00+03:00",
      "source": "slack",
      "action_type": "proposal_shared",
      "title": "EMPOI internal-account transfer proposal",
      "summary": "Posted a proposal about allowing an internal account to transfer to recipients from other accounts, motivated by EMPOI recipient-copy edge cases and special logic.",
      "project_id": "extra-money-payouts",
      "project_role": "core_contributor",
      "role_confidence": "medium",
      "role_reason": "Inherited from the normalized project record.",
      "confidence": 0.9,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 1,
      "decisions": [],
      "followups": [
        {
          "id": "fu_2026-06-04_empoi_internal_account",
          "summary": "Get feedback from transfer/public-transfer owners on internal account recipient ownership proposal."
        },
        {
          "id": "fu_2026-06-04_standard_recipient_copy",
          "summary": "Ask Contacts whether recipient-copy support can be standardized."
        }
      ],
      "risks": [
        {
          "id": "risk_2026-06-04_empoi_edge_cases",
          "summary": "Recipient-copy edge cases have accumulated special logic and may keep increasing implementation complexity."
        }
      ],
      "path": "events/2026/06/2026-06-04.events.jsonl"
    },
    {
      "id": "evt_2026-06-04_slack_gso_id_pdioc_654",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T16:00:00+03:00",
      "source": "slack",
      "action_type": "support_request_triaged",
      "title": "PDIOC-654 GSO ID in Samurai",
      "summary": "Followed up on a request to display Global Switch Off ID in Samurai for suspended POIs, resulting in a synced Jira work item PDIOC-654.",
      "project_id": "support-and-on-call",
      "project_role": "unknown",
      "role_confidence": null,
      "role_reason": null,
      "confidence": 0.82,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-04.events.jsonl"
    },
    {
      "id": "evt_2026-06-05_slack_pdi_support_fixed",
      "date": "2026-06-05",
      "timestamp": "2026-06-05T10:00:00+03:00",
      "source": "slack",
      "action_type": "support_request_resolved",
      "title": "PDI support threads marked fixed",
      "summary": "Marked or stated that two help-payment-defects-incidents support items were fixed.",
      "project_id": "support-and-on-call",
      "project_role": "unknown",
      "role_confidence": null,
      "role_reason": null,
      "confidence": 0.82,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 1,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-05.events.jsonl"
    },
    {
      "id": "evt_2026-06-05_slack_work_memory_seed_request",
      "date": "2026-06-05",
      "timestamp": "2026-06-05T12:00:00+03:00",
      "source": "slack",
      "action_type": "tooling_context_shared",
      "title": "Personal work-memory plugin context shared",
      "summary": "Shared the wise-personal-momory-pluging repository and seed source links for initializing personal work memory.",
      "project_id": "work-memory",
      "project_role": "unknown",
      "role_confidence": null,
      "role_reason": null,
      "confidence": 0.95,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-05.events.jsonl"
    }
  ],
  "projects": [
    {
      "id": "support-and-on-call",
      "name": "Support and on-call",
      "status": "active",
      "themes": [],
      "role": "Unspecified role",
      "involvement_role": "unknown",
      "confidence": 0.82,
      "aliases": [],
      "source_links": [],
      "definition": "Recurring payment-defects-incidents on-call, PDIOC support requests, Rollbar/alert triage, production support fixes, and small incident/help-channel investigations.",
      "current_status": "Active recurring responsibility.",
      "lifecycle": "active",
      "paths": [
        "projects/active/support-and-on-call",
        "projects/active/support-and-on-call/project.md"
      ],
      "timeline_count": 9,
      "decisions_count": 1,
      "followups_count": 3,
      "risks_count": 1,
      "role_counts": {},
      "event_count": 9,
      "daily_count": 4,
      "latest_date": "2026-06-05"
    },
    {
      "id": "configurable-queue",
      "name": "Configurable queue",
      "status": "rollout",
      "priority": "P1",
      "themes": [
        "platform_maintenance",
        "resolution"
      ],
      "role": "Engineer",
      "involvement_role": "core_contributor",
      "role_confidence": "high",
      "confidence": null,
      "aliases": [
        "config queue",
        "PayOps routing system",
        "queue routing"
      ],
      "source_links": [
        "https://transferwise.atlassian.net/wiki/spaces/POT/pages/4058514360/Q2+26+Projects+Overview+-+PDI"
      ],
      "definition": "",
      "current_status": "",
      "lifecycle": "active",
      "paths": [
        "projects/active/configurable-queue",
        "projects/active/configurable-queue.yaml"
      ],
      "timeline_count": 5,
      "decisions_count": 1,
      "followups_count": 4,
      "risks_count": 1,
      "role_counts": {},
      "event_count": 6,
      "daily_count": 3,
      "latest_date": "2026-06-03"
    },
    {
      "id": "cross-team-escalations-zd-ddcase",
      "name": "Cross team escalation (ZD <> ddcase sync)",
      "status": "implementation",
      "priority": "P1",
      "themes": [
        "platform_maintenance",
        "process",
        "resolution"
      ],
      "role": "Engineer",
      "involvement_role": "core_contributor",
      "role_confidence": "high",
      "confidence": null,
      "aliases": [
        "CTE",
        "Samurai sync cases",
        "ZD sync",
        "Zendesk to dd-case sync"
      ],
      "source_links": [
        "https://transferwise.atlassian.net/wiki/spaces/POT/pages/4058514360/Q2+26+Projects+Overview+-+PDI"
      ],
      "definition": "",
      "current_status": "",
      "lifecycle": "active",
      "paths": [
        "projects/active/cross-team-escalations-zd-ddcase",
        "projects/active/cross-team-escalations-zd-ddcase.yaml"
      ],
      "timeline_count": 2,
      "decisions_count": 1,
      "followups_count": 2,
      "risks_count": 1,
      "role_counts": {},
      "event_count": 2,
      "daily_count": 1,
      "latest_date": "2026-06-04"
    },
    {
      "id": "automating-ops-tasks",
      "name": "Automating Ops tasks",
      "status": "implementation",
      "priority": "P1",
      "themes": [
        "automation",
        "prevention",
        "resolution"
      ],
      "role": "Engineer",
      "involvement_role": "core_contributor",
      "role_confidence": "high",
      "confidence": null,
      "aliases": [
        "Depo no order",
        "Doc Upload automation",
        "Feature Y",
        "last mile linking"
      ],
      "source_links": [
        "https://docs.google.com/presentation/d/1VXagxcYLEAc5KUW8AkBNONRbXEHfLmwLJr8bbsUUIu4/edit",
        "https://transferwise.atlassian.net/wiki/spaces/POT/pages/4058514360/Q2+26+Projects+Overview+-+PDI"
      ],
      "definition": "",
      "current_status": "",
      "lifecycle": "active",
      "paths": [
        "projects/active/automating-ops-tasks",
        "projects/active/automating-ops-tasks.yaml"
      ],
      "timeline_count": 1,
      "decisions_count": 1,
      "followups_count": 1,
      "risks_count": 1,
      "role_counts": {},
      "event_count": 1,
      "daily_count": 1,
      "latest_date": "2026-06-02"
    },
    {
      "id": "extra-money-payouts",
      "name": "Extra Money Payouts",
      "status": "implementation",
      "priority": "P1",
      "themes": [
        "losses",
        "operational_risk"
      ],
      "role": "Engineer",
      "involvement_role": "core_contributor",
      "role_confidence": "medium",
      "confidence": null,
      "aliases": [
        "cash payout",
        "compensation orchestrator",
        "compensation payout",
        "EMPOI"
      ],
      "source_links": [
        "https://docs.google.com/presentation/d/1VXagxcYLEAc5KUW8AkBNONRbXEHfLmwLJr8bbsUUIu4/edit"
      ],
      "definition": "",
      "current_status": "",
      "lifecycle": "active",
      "paths": [
        "projects/active/extra-money-payouts",
        "projects/active/extra-money-payouts.yaml"
      ],
      "timeline_count": 1,
      "decisions_count": 1,
      "followups_count": 2,
      "risks_count": 1,
      "role_counts": {},
      "event_count": 1,
      "daily_count": 1,
      "latest_date": "2026-06-04"
    },
    {
      "id": "webapp-ninjas-migration",
      "name": "Migration of Webapp tags and comments",
      "status": "implementation",
      "priority": "P1",
      "themes": [
        "platform_maintenance",
        "security"
      ],
      "role": "Team-adjacent engineer",
      "involvement_role": "side_helper",
      "role_confidence": "medium",
      "confidence": null,
      "aliases": [
        "legacy comments endpoint",
        "Ninjas1 tags",
        "Webapp Ninjas VPN Ingress Cut-off"
      ],
      "source_links": [
        "https://docs.google.com/presentation/d/1VXagxcYLEAc5KUW8AkBNONRbXEHfLmwLJr8bbsUUIu4/edit",
        "https://transferwise.atlassian.net/wiki/spaces/POT/pages/4058514360/Q2+26+Projects+Overview+-+PDI"
      ],
      "definition": "",
      "current_status": "",
      "lifecycle": "active",
      "paths": [
        "projects/active/webapp-ninjas-migration",
        "projects/active/webapp-ninjas-migration.yaml"
      ],
      "timeline_count": 0,
      "decisions_count": 0,
      "followups_count": 0,
      "risks_count": 0,
      "role_counts": {},
      "event_count": 1,
      "daily_count": 0,
      "latest_date": "2026-06-01"
    },
    {
      "id": "work-memory",
      "name": "Personal work memory",
      "status": "active",
      "themes": [],
      "role": "Unspecified role",
      "involvement_role": "unknown",
      "confidence": 0.95,
      "aliases": [],
      "source_links": [],
      "definition": "Local personal work trace memory plugin, seed context, daily backfills, rollups, and retrieval-oriented work documentation.",
      "current_status": "Initiali",
      "lifecycle": "active",
      "paths": [
        "projects/active/work-memory",
        "projects/active/work-memory/project.md"
      ],
      "timeline_count": 1,
      "decisions_count": 1,
      "followups_count": 1,
      "risks_count": 1,
      "role_counts": {},
      "event_count": 1,
      "daily_count": 1,
      "latest_date": "2026-06-05"
    },
    {
      "id": "retry-volume-control",
      "name": "Retry volume control",
      "status": "implementation",
      "priority": "P1",
      "themes": [
        "losses",
        "operational_risk"
      ],
      "role": "Contributor or adjacent engineer",
      "involvement_role": "side_helper",
      "role_confidence": "medium",
      "confidence": null,
      "aliases": [
        "double payout controls",
        "retry controls",
        "unreliable rejection"
      ],
      "source_links": [
        "https://docs.google.com/presentation/d/1VXagxcYLEAc5KUW8AkBNONRbXEHfLmwLJr8bbsUUIu4/edit",
        "https://transferwise.atlassian.net/wiki/spaces/POT/pages/4058514360/Q2+26+Projects+Overview+-+PDI"
      ],
      "definition": "",
      "current_status": "",
      "lifecycle": "active",
      "paths": [
        "projects/active/retry-volume-control",
        "projects/active/retry-volume-control.yaml"
      ],
      "timeline_count": 1,
      "decisions_count": 1,
      "followups_count": 1,
      "risks_count": 1,
      "role_counts": {},
      "event_count": 1,
      "daily_count": 1,
      "latest_date": "2026-06-02"
    },
    {
      "id": "case-based-access",
      "name": "Case based access",
      "status": "discovery",
      "priority": "P1",
      "themes": [
        "operational_risk",
        "security"
      ],
      "role": "Engineer",
      "involvement_role": "core_contributor",
      "role_confidence": "high",
      "confidence": null,
      "aliases": [
        "CBA",
        "on-demand access",
        "profile budgeting",
        "waiting state"
      ],
      "source_links": [
        "https://docs.google.com/presentation/d/1VXagxcYLEAc5KUW8AkBNONRbXEHfLmwLJr8bbsUUIu4/edit",
        "https://transferwise.atlassian.net/wiki/spaces/POT/pages/4058514360/Q2+26+Projects+Overview+-+PDI"
      ],
      "definition": "",
      "current_status": "",
      "lifecycle": "active",
      "paths": [
        "projects/active/case-based-access.yaml"
      ],
      "role_counts": {},
      "event_count": 0,
      "daily_count": 0,
      "latest_date": null,
      "timeline_count": 0,
      "decisions_count": 0,
      "followups_count": 0,
      "risks_count": 0
    },
    {
      "id": "manual-internal-transfers",
      "name": "Manual Internal Transfers Tool",
      "status": "post_release",
      "priority": "P1",
      "themes": [
        "losses",
        "operational_risk"
      ],
      "role": "Engineer",
      "involvement_role": "core_contributor",
      "role_confidence": "high",
      "confidence": null,
      "aliases": [
        "adhoc tool",
        "margin take out",
        "MTO"
      ],
      "source_links": [
        "https://docs.google.com/presentation/d/1VXagxcYLEAc5KUW8AkBNONRbXEHfLmwLJr8bbsUUIu4/edit",
        "https://transferwise.atlassian.net/wiki/spaces/POT/pages/4058514360/Q2+26+Projects+Overview+-+PDI"
      ],
      "definition": "",
      "current_status": "",
      "lifecycle": "active",
      "paths": [
        "projects/active/manual-internal-transfers.yaml"
      ],
      "role_counts": {},
      "event_count": 0,
      "daily_count": 0,
      "latest_date": null,
      "timeline_count": 0,
      "decisions_count": 0,
      "followups_count": 0,
      "risks_count": 0
    }
  ],
  "roles": [
    {
      "name": "core_contributor",
      "label": "Core contributor",
      "project_count": 6,
      "event_count": 10,
      "projects": [
        "configurable-queue",
        "cross-team-escalations-zd-ddcase",
        "automating-ops-tasks",
        "extra-money-payouts",
        "case-based-access",
        "manual-internal-transfers"
      ]
    },
    {
      "name": "side_helper",
      "label": "Side helper",
      "project_count": 2,
      "event_count": 2,
      "projects": [
        "webapp-ninjas-migration",
        "retry-volume-control"
      ]
    },
    {
      "name": "unknown",
      "label": "Unknown",
      "project_count": 2,
      "event_count": 10,
      "projects": [
        "support-and-on-call",
        "work-memory"
      ]
    }
  ],
  "sources": [
    {
      "source": "available_sources",
      "event_count": 0,
      "covered_true_count": 0,
      "covered_false_count": 0
    },
    {
      "source": "confluence",
      "event_count": 0,
      "covered_true_count": 4,
      "covered_false_count": 1
    },
    {
      "source": "github",
      "event_count": 5,
      "covered_true_count": 2,
      "covered_false_count": 3
    },
    {
      "source": "gmail",
      "event_count": 0,
      "covered_true_count": 0,
      "covered_false_count": 5
    },
    {
      "source": "google_calendar",
      "event_count": 0,
      "covered_true_count": 0,
      "covered_false_count": 5
    },
    {
      "source": "google_meet",
      "event_count": 0,
      "covered_true_count": 0,
      "covered_false_count": 5
    },
    {
      "source": "initialized_at",
      "event_count": 0,
      "covered_true_count": 0,
      "covered_false_count": 0
    },
    {
      "source": "jira",
      "event_count": 0,
      "covered_true_count": 4,
      "covered_false_count": 1
    },
    {
      "source": "manual_supplements",
      "event_count": 0,
      "covered_true_count": 0,
      "covered_false_count": 0
    },
    {
      "source": "schema_version",
      "event_count": 0,
      "covered_true_count": 0,
      "covered_false_count": 0
    },
    {
      "source": "slack",
      "event_count": 17,
      "covered_true_count": 5,
      "covered_false_count": 0
    },
    {
      "source": "source_boundaries",
      "event_count": 0,
      "covered_true_count": 0,
      "covered_false_count": 0
    }
  ],
  "rollups": {
    "weekly": [
      {
        "record_type": "weekly_summary",
        "week": "2026-W23",
        "source_daily_records": [
          "2026-06-01",
          "2026-06-02",
          "2026-06-03",
          "2026-06-04",
          "2026-06-05"
        ],
        "confidence": 0.8,
        "projects_touched": {
          "support-and-on-call": 9,
          "configurable-queue": 5,
          "cross-team-escalations-zd-ddcase": 2,
          "extra-money-payouts": 1,
          "automating-ops-tasks": 1,
          "retry-volume-control": 1,
          "work-memory": 1
        },
        "open_followups": [
          "system alert catch-all/forwarding behavior",
          "old queue-config removal split",
          "PayOps automation framework decision",
          "M2E auto-cancel documentation update",
          "ZD custom-field/contact-contract validation",
          "EMPOI recipient-copy feedback"
        ],
        "source_gaps": [
          "calendar_event_listing_unavailable",
          "manual_supplements_not_provided",
          "full_jira_changelog_not_available",
          "2026-06-05_midday_partial_record"
        ],
        "path": "weekly/2026/2026-W23.summary.json"
      }
    ],
    "monthly": [],
    "quarterly": []
  },
  "signals": {
    "followups": [
      {
        "id": "fu_2026-06-01_config_queue_system_alert",
        "summary": "Confirm whether system alert cases should be excluded from catch-all queues."
      },
      {
        "id": "fu_2026-06-02_config_queue_cleanup_split",
        "summary": "Split or coordinate old-config removal work with Michelle."
      },
      {
        "id": "fu_2026-06-02_jexl_verifier",
        "summary": "Think through local/offline JEXL validation design for queue routing."
      },
      {
        "id": "fu_2026-06-02_automation_framework_decision",
        "summary": "Clarify whether the team should invest in the automation framework direction."
      },
      {
        "id": "fu_2026-06-02_system_alert_forwarding",
        "summary": "Find the right owner/consultant for system alert case forwarding policy."
      },
      {
        "id": "fu_2026-06-03_workflow_ui_review",
        "summary": "Get workflow-ui PR 2809 reviewed."
      },
      {
        "id": "fu_2026-06-03_m2e_doc_update",
        "summary": "Update documentation to reflect 10-working-day auto-cancel behavior."
      },
      {
        "id": "fu_2026-06-03_webapp_dead_code",
        "summary": "Consider removing unused old 7-day webapp config/dead code later."
      },
      {
        "id": "fu_2026-06-04_zd_custom_fields",
        "summary": "Verify whether ZD custom fields can be fetched and mapped to transfer ID."
      },
      {
        "id": "fu_2026-06-04_contact_contract",
        "summary": "Confirm whether contact-side event contract changes are needed before implementation."
      },
      {
        "id": "fu_2026-06-04_empoi_internal_account",
        "summary": "Get feedback from transfer/public-transfer owners on internal account recipient ownership proposal."
      },
      {
        "id": "fu_2026-06-04_standard_recipient_copy",
        "summary": "Ask Contacts whether recipient-copy support can be standardized."
      },
      "Automating Ops tasks: 1 project follow-up entries",
      "Configurable queue: 4 project follow-up entries",
      "Cross team escalation (ZD <> ddcase sync): 2 project follow-up entries",
      "EMPOI recipient-copy feedback",
      "Extra Money Payouts: 2 project follow-up entries",
      "M2E auto-cancel documentation update",
      "old queue-config removal split",
      "PayOps automation framework decision",
      "Personal work memory: 1 project follow-up entries",
      "Retry volume control: 1 project follow-up entries",
      "Support and on-call: 3 project follow-up entries",
      "system alert catch-all/forwarding behavior",
      "ZD custom-field/contact-contract validation"
    ],
    "risks": [
      {
        "id": "risk_2026-06-02_framework_ambiguity",
        "summary": "Framework scope and ownership remained unsettled based on Slack discussion."
      },
      {
        "id": "risk_2026-06-04_zd_sync_capacity",
        "summary": "Discussion suggested the work may need to wait for contact-side owner/manpower."
      },
      {
        "id": "risk_2026-06-04_empoi_edge_cases",
        "summary": "Recipient-copy edge cases have accumulated special logic and may keep increasing implementation complexity."
      },
      "Automating Ops tasks: 1 project risk entries",
      "Configurable queue: 1 project risk entries",
      "Cross team escalation (ZD <> ddcase sync): 1 project risk entries",
      "Extra Money Payouts: 1 project risk entries",
      "Personal work memory: 1 project risk entries",
      "Retry volume control: 1 project risk entries",
      "Support and on-call: 1 project risk entries"
    ],
    "source_gaps": [
      "2026-06-05_midday_partial_record",
      "calendar_event_listing_unavailable",
      "full_jira_changelog_not_available",
      "github_no_date_specific_delivery_evidence",
      "manual_supplement_not_provided",
      "manual_supplements_not_provided",
      "midday_partial_record"
    ]
  }
};
