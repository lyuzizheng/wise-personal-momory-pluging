window.WORK_TRACE_DATA = {
  "schema_version": 1,
  "generated_at": "2026-06-05T10:40:27.631Z",
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
    "event_count": 47,
    "project_count": 10,
    "role_count": 2,
    "source_gap_count": 10,
    "followup_count": 23,
    "risk_count": 6
  },
  "dailyRecords": [
    {
      "date": "2026-06-01",
      "confidence": 0.83,
      "event_count": 9,
      "projects_touched": {
        "support-and-on-call": 3,
        "cross-team-escalations-zd-ddcase": 2,
        "configurable-queue": 2
      },
      "unclassified_event_count": 2,
      "source_gaps": [
        "private_slack_dm_not_queried_by_default",
        "full_jira_changelog_not_fetched",
        "gmail_disabled_or_not_queried",
        "gdocs_body_not_queried",
        "manual_supplement_prompted_no_new_data"
      ],
      "executive_summary": "The updated record now combines Slack, GitHub, and calendar metadata. The strongest work signals are on-call/support coverage, configurable queue discussion, and early POT-2411 warning-tracking work; calendar-only planning events are marked as observer evidence.",
      "delta": "First date in the requested update range.",
      "project_activity": [
        {
          "project_id": "support-and-on-call",
          "name": "Support and on-call",
          "summary": "Support and on-call activity including PDIOC support, fixes, on-call health review, and support follow-through.",
          "decisions": [
            "None captured."
          ],
          "followups": [
            "None captured."
          ],
          "blockers": []
        },
        {
          "project_id": "configurable-queue",
          "name": "Configurable queue",
          "summary": "Configurable queue/routing work including cleanup, JEXL validation, backlog v1 deprecation, WFM planning, and catch-all queue alerting review.",
          "decisions": [
            "None captured."
          ],
          "followups": [
            "fu_2026-06-01_config_queue_system_alert: Confirm whether system alert cases should be excluded from catch-all queues."
          ],
          "blockers": []
        },
        {
          "project_id": "cross-team-escalations-",
          "name": "Cross Team Escalations ",
          "summary": "",
          "decisions": [],
          "followups": [],
          "blockers": []
        }
      ],
      "sources_covered": {
        "github": true,
        "jira": true,
        "slack": true,
        "confluence": true,
        "google_calendar": true,
        "google_meet": false,
        "gmail": false
      },
      "path": "daily/2026/06/2026-06-01.md"
    },
    {
      "date": "2026-06-02",
      "confidence": 0.83,
      "event_count": 12,
      "projects_touched": {
        "configurable-queue": 2,
        "support-and-on-call": 1,
        "cross-team-escalations-zd-ddcase": 3,
        "automating-ops-tasks": 2,
        "retry-volume-control": 1,
        "case-based-access": 1
      },
      "unclassified_event_count": 2,
      "source_gaps": [
        "private_slack_dm_not_queried_by_default",
        "full_jira_changelog_not_fetched",
        "gmail_disabled_or_not_queried",
        "gdocs_body_not_queried",
        "manual_supplement_prompted_no_new_data"
      ],
      "executive_summary": "The updated record shows configurable queue cleanup and JEXL validation thinking, PayOps automation framework planning, retry-control support, and the opening/review of several GitHub PRs. Calendar metadata adds CBA and AI-automation planning context, but those meetings remain observer-only unless supported by stronger evidence.",
      "delta": "Planning and support expanded from on-call/config queue into automation-framework and retry-control topics.",
      "project_activity": [
        {
          "project_id": "cross-team-escalations-",
          "name": "Cross Team Escalations ",
          "summary": "",
          "decisions": [],
          "followups": [],
          "blockers": []
        }
      ],
      "sources_covered": {
        "github": true,
        "jira": false,
        "slack": true,
        "confluence": true,
        "google_calendar": true,
        "google_meet": false,
        "gmail": false
      },
      "path": "daily/2026/06/2026-06-02.md"
    },
    {
      "date": "2026-06-03",
      "confidence": 0.82,
      "event_count": 10,
      "projects_touched": {
        "support-and-on-call": 6,
        "webapp-ninjas-migration": 1,
        "configurable-queue": 3
      },
      "unclassified_event_count": 0,
      "source_gaps": [
        "private_slack_dm_not_queried_by_default",
        "full_jira_changelog_not_fetched",
        "gmail_disabled_or_not_queried",
        "gdocs_body_not_queried",
        "manual_supplement_prompted_no_new_data"
      ],
      "executive_summary": "The day is now clearly delivery-heavy: self-service, Samurai, workflow-ui, and dd-case work moved forward, with support investigations around document deletion errors, balance-withdrawal self-assignment, and M2E auto-cancel behavior. The PDI Q2 review/retro is recorded as calendar observer context.",
      "delta": "Work shifted from planning-heavy traces into concrete support delivery and merged PRs.",
      "project_activity": [
        {
          "project_id": "support-and-on-call",
          "name": "Support and on-call",
          "summary": "Support and on-call activity including PDIOC support, fixes, on-call health review, and support follow-through.",
          "decisions": [
            "decision_2026-06-03_m2e_auto_cancel: M2E auto-cancel timing should be treated as 10 working days; old 7-day webapp config is not used."
          ],
          "followups": [
            "fu_2026-06-03_workflow_ui_review: Get workflow-ui PR 2809 reviewed.",
            "fu_2026-06-03_m2e_doc_update: Update documentation to reflect 10-working-day auto-cancel behavior.",
            "fu_2026-06-03_webapp_dead_code: Consider removing unused old 7-day webapp config/dead code later."
          ],
          "blockers": []
        },
        {
          "project_id": "configurable-queue",
          "name": "Configurable queue",
          "summary": "Configurable queue/routing work including cleanup, JEXL validation, backlog v1 deprecation, WFM planning, and catch-all queue alerting review.",
          "decisions": [
            "None captured."
          ],
          "followups": [
            "None captured."
          ],
          "blockers": []
        },
        {
          "project_id": "webapp-ninjas-migration",
          "name": "Migration of Webapp tags and comments",
          "summary": "Review/support context around tags/comments or Ninjas deprecation migration work.",
          "decisions": [
            "None captured."
          ],
          "followups": [
            "None captured."
          ],
          "blockers": []
        }
      ],
      "sources_covered": {
        "github": true,
        "jira": true,
        "slack": true,
        "confluence": false,
        "google_calendar": true,
        "google_meet": false,
        "gmail": false
      },
      "path": "daily/2026/06/2026-06-03.md"
    },
    {
      "date": "2026-06-04",
      "confidence": 0.84,
      "event_count": 12,
      "projects_touched": {
        "support-and-on-call": 6,
        "cross-team-escalations-zd-ddcase": 5,
        "extra-money-payouts": 1
      },
      "unclassified_event_count": 0,
      "source_gaps": [
        "private_slack_dm_not_queried_by_default",
        "full_jira_changelog_not_fetched",
        "gmail_disabled_or_not_queried",
        "gdocs_body_not_queried",
        "manual_supplement_prompted_no_new_data"
      ],
      "executive_summary": "The updated record shows heavy support delivery and design work: PDIOC-653, PDIOC-652, PDIOC-655, POT-2411, ZD sync, EMPOI recipient handling, and GSO ID API-placement discussion. GitHub review-only POT-2423 work is separated from authored/core contribution.",
      "delta": "Support delivery continued while ZD sync and EMPOI architecture discussions became more prominent.",
      "project_activity": [
        {
          "project_id": "support-and-on-call",
          "name": "Support and on-call",
          "summary": "Support and on-call activity including PDIOC support, fixes, on-call health review, and support follow-through.",
          "decisions": [
            "None captured."
          ],
          "followups": [
            "None captured."
          ],
          "blockers": []
        },
        {
          "project_id": "cross-team-escalations-",
          "name": "Cross Team Escalations ",
          "summary": "",
          "decisions": [],
          "followups": [],
          "blockers": []
        }
      ],
      "sources_covered": {
        "github": true,
        "jira": true,
        "slack": true,
        "confluence": true,
        "google_calendar": true,
        "google_meet": false,
        "gmail": false
      },
      "path": "daily/2026/06/2026-06-04.md"
    },
    {
      "date": "2026-06-05",
      "confidence": 0.88,
      "event_count": 4,
      "projects_touched": {
        "support-and-on-call": 2,
        "work-memory": 1
      },
      "unclassified_event_count": 1,
      "source_gaps": [
        "private_slack_dm_not_queried_by_default",
        "full_jira_changelog_not_fetched",
        "gmail_disabled_or_not_queried",
        "gdocs_body_not_queried",
        "manual_supplement_prompted_no_new_data",
        "same_day_partial_record"
      ],
      "executive_summary": "Available Friday evidence now includes the continuing dd-case PDIOC-655 PR, public Slack support closures, work-memory initiali",
      "delta": "Friday added follow-up on PDIOC-655 and support closure, but remains a partial same-day record.",
      "project_activity": [
        {
          "project_id": "support-and-on-call",
          "name": "Support and on-call",
          "summary": "Support and on-call activity including PDIOC support, fixes, on-call health review, and support follow-through.",
          "decisions": [
            "None captured."
          ],
          "followups": [
            "None captured."
          ],
          "blockers": []
        },
        {
          "project_id": "work-memory",
          "name": "Personal work memory",
          "summary": "Personal work-memory plugin/source-context initiali",
          "decisions": [],
          "followups": [],
          "blockers": []
        }
      ],
      "sources_covered": {
        "github": true,
        "jira": false,
        "slack": true,
        "confluence": false,
        "google_calendar": true,
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
      "summary": "Received Rootly notification that the payment-defects-incidents main on-call shift started.",
      "project_id": "support-and-on-call",
      "project_role": "owner",
      "role_confidence": 0.78,
      "role_reason": "The evidence shows accountable on-call or project responsibility.",
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
      "id": "evt_2026-06-01_calendar_pot_weekly_planning",
      "date": "2026-06-01",
      "timestamp": "2026-06-01T09:30:00+03:00",
      "source": "google_calendar",
      "action_type": "meeting_attended",
      "title": "POT - Weekly planning",
      "summary": "Attended POT weekly planning with Q2 PDI project overview linked in the calendar metadata.",
      "project_id": "support-and-on-call",
      "project_role": "core_contributor",
      "role_confidence": 0.82,
      "role_reason": "The evidence is meeting attendance or background visibility only.",
      "confidence": 0.72,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-01.events.jsonl"
    },
    {
      "id": "evt_2026-06-01_calendar_oncall_health_review",
      "date": "2026-06-01",
      "timestamp": "2026-06-01T10:00:00+03:00",
      "source": "google_calendar",
      "action_type": "meeting_attended",
      "title": "On-call health review",
      "summary": "Attended the recurring on-call health review.",
      "project_id": "support-and-on-call",
      "project_role": "observer",
      "role_confidence": 0.84,
      "role_reason": "The evidence is meeting attendance or background visibility only.",
      "confidence": 0.8,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
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
      "summary": "Acknowledged PDI help/support requests and asked for case context needed for triage.",
      "project_id": "support-and-on-call",
      "project_role": "side_helper",
      "role_confidence": 0.78,
      "role_reason": "The user provided targeted support or one-off analysis without owning the broader project.",
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
      "id": "evt_2026-06-01_github_twilio_pot_2411_pr3036",
      "date": "2026-06-01",
      "timestamp": "2026-06-01T14:29:54+03:00",
      "source": "github",
      "action_type": "pull_request_opened_closed",
      "title": "[POT-2411] fix: track warning on final send escalation (#3036)",
      "summary": "Opened an earlier POT-2411 final Send Case warning-tracking PR that was later closed before the replacement PR landed.",
      "project_id": "cross-team-escalations-zd-ddcase",
      "project_role": "core_contributor",
      "role_confidence": 0.76,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
      "confidence": 0.79,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-01.events.jsonl"
    },
    {
      "id": "evt_2026-06-01_github_review_catch_all_alerting",
      "date": "2026-06-01",
      "timestamp": "2026-06-01T14:29:57+03:00",
      "source": "github",
      "action_type": "pull_request_reviewed",
      "title": "[POT-2435] Add alerting for Payops Catch All Queues",
      "summary": "Reviewed or participated in PR activity for PayOps catch-all queue alerting.",
      "project_id": "configurable-queue",
      "project_role": "reviewer",
      "role_confidence": 0.9,
      "role_reason": "The user reviewed or approved someone else's PR/design without owning delivery.",
      "confidence": 0.82,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
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
      "summary": "Discussed configurable queue behavior, including catch-all handling for system alert cases and possible tooling around JEXL/config organization.",
      "project_id": "configurable-queue",
      "project_role": "core_contributor",
      "role_confidence": 0.78,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "id": "evt_2026-06-01_calendar_escalations_sync_prep",
      "date": "2026-06-01",
      "timestamp": "2026-06-01T16:00:00+03:00",
      "source": "google_calendar",
      "action_type": "meeting_attended",
      "title": "Escalations sync + planning prep",
      "summary": "Attended an escalations sync and planning preparation meeting.",
      "project_id": "cross-team-escalations-zd-ddcase",
      "project_role": "observer",
      "role_confidence": 0.82,
      "role_reason": "The evidence is meeting attendance or background visibility only.",
      "confidence": 0.78,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
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
      "summary": "Participated in a public payment-ops-tooling-dev discussion about behavior that might be removed during Ninjas deprecation.",
      "project_id": "webapp-ninjas-migration",
      "project_role": "side_helper",
      "role_confidence": 0.7,
      "role_reason": "The user provided targeted support or one-off analysis without owning the broader project.",
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
      "role_confidence": 0.82,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "role_confidence": 0.8,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "id": "evt_2026-06-02_github_self_service_pdioc_649_pr3057_open",
      "date": "2026-06-02",
      "timestamp": "2026-06-02T11:13:04+03:00",
      "source": "github",
      "action_type": "pull_request_opened",
      "title": "[PDIOC-649] fix: handle empty ADS error responses",
      "summary": "Opened the self-service PDIOC-649 PR to handle blank ADS error responses.",
      "project_id": "support-and-on-call",
      "project_role": "core_contributor",
      "role_confidence": 0.86,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
      "confidence": 0.82,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-02.events.jsonl"
    },
    {
      "id": "evt_2026-06-02_github_twilio_pot_2411_pr3038_open",
      "date": "2026-06-02",
      "timestamp": "2026-06-02T11:33:46+03:00",
      "source": "github",
      "action_type": "pull_request_opened",
      "title": "[POT-2411] fix: track warning on final send escalation",
      "summary": "Opened the replacement POT-2411 Send Case final-warning tracking PR.",
      "project_id": "cross-team-escalations-zd-ddcase",
      "project_role": "core_contributor",
      "role_confidence": 0.84,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
      "confidence": 0.79,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-02.events.jsonl"
    },
    {
      "id": "evt_2026-06-02_github_review_ddcase_pot2423_currency",
      "date": "2026-06-02",
      "timestamp": "2026-06-02T11:43:30+03:00",
      "source": "github",
      "action_type": "pull_request_reviewed",
      "title": "[POT-2423] Add zendesk currency, set payops team, remove comments",
      "summary": "Reviewed PR activity related to Zendesk/DD-case sync currency and team mapping.",
      "project_id": "cross-team-escalations-zd-ddcase",
      "project_role": "reviewer",
      "role_confidence": 0.9,
      "role_reason": "The user reviewed or approved someone else's PR/design without owning delivery.",
      "confidence": 0.84,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-02.events.jsonl"
    },
    {
      "id": "evt_2026-06-02_calendar_zizheng_amanda",
      "date": "2026-06-02",
      "timestamp": "2026-06-02T14:00:00+03:00",
      "source": "google_calendar",
      "action_type": "meeting_attended",
      "title": "Zizheng / Amanda",
      "summary": "Attended a 1:1/sync with Amanda; project mapping is inferred from the same-day automation-framework discussion.",
      "project_id": "automating-ops-tasks",
      "project_role": "core_contributor",
      "role_confidence": 0.8,
      "role_reason": "The evidence is meeting attendance or background visibility only.",
      "confidence": 0.64,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
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
      "summary": "Shared the PayOps Automation Process Paradigm and Framework Capabilities RFC and discussed whether to pursue that framework direction.",
      "project_id": "automating-ops-tasks",
      "project_role": "core_contributor",
      "role_confidence": 0.84,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
          "summary": "Framework scope and ownership remained unsettled based on Slack/planning discussion."
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
      "summary": "Helped explain retry-control alert behavior: detected POIs in the window can differ from suspended transfers shown in exports.",
      "project_id": "retry-volume-control",
      "project_role": "side_helper",
      "role_confidence": 0.8,
      "role_reason": "The user provided targeted support or one-off analysis without owning the broader project.",
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
      "id": "evt_2026-06-02_github_review_ddcase_pot2423_group",
      "date": "2026-06-02",
      "timestamp": "2026-06-02T15:40:22+03:00",
      "source": "github",
      "action_type": "pull_request_reviewed",
      "title": "[POT-2423] Add fallback currency and group logic for zendesk IR cases",
      "summary": "Reviewed PR activity for fallback currency/group logic in Zendesk IR case sync.",
      "project_id": "cross-team-escalations-zd-ddcase",
      "project_role": "reviewer",
      "role_confidence": 0.9,
      "role_reason": "The user reviewed or approved someone else's PR/design without owning delivery.",
      "confidence": 0.84,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-02.events.jsonl"
    },
    {
      "id": "evt_2026-06-02_calendar_cba_weekly_sync",
      "date": "2026-06-02",
      "timestamp": "2026-06-02T16:00:00+03:00",
      "source": "google_calendar",
      "action_type": "meeting_attended",
      "title": "CBA weekly sync",
      "summary": "Calendar shows attendance or invitation for CBA weekly sync; no direct contribution is inferred from metadata alone.",
      "project_id": "case-based-access",
      "project_role": "observer",
      "role_confidence": 0.82,
      "role_reason": "The evidence is meeting attendance or background visibility only.",
      "confidence": 0.78,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
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
      "role_confidence": 0.74,
      "role_reason": "The user provided targeted support or one-off analysis without owning the broader project.",
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
      "id": "evt_2026-06-02_calendar_ai_automation_sync",
      "date": "2026-06-02",
      "timestamp": "2026-06-02T17:30:00+03:00",
      "source": "google_calendar",
      "action_type": "meeting_attended",
      "title": "Sync Up on AI Automation Tech Next Step",
      "summary": "Attended a sync about next steps for AI automation technology.",
      "project_id": "automating-ops-tasks",
      "project_role": "observer",
      "role_confidence": 0.82,
      "role_reason": "The evidence is meeting attendance or background visibility only.",
      "confidence": 0.78,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-02.events.jsonl"
    },
    {
      "id": "evt_2026-06-03_calendar_pdi_q2_review_retro",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T09:00:00+03:00",
      "source": "google_calendar",
      "action_type": "meeting_attended",
      "title": "Payment Defects & Incidents Q2 review and retro",
      "summary": "Attended the Payment Defects & Incidents Q2 review and retro.",
      "project_id": "support-and-on-call",
      "project_role": "observer",
      "role_confidence": 0.82,
      "role_reason": "The evidence is meeting attendance or background visibility only.",
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
      "id": "evt_2026-06-03_github_self_service_pdioc_649",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T10:55:44+03:00",
      "source": "github",
      "action_type": "pull_request_merged",
      "title": "[PDIOC-649] fix: handle empty ADS error responses",
      "summary": "Merged the self-service fix for blank ADS error responses so empty 4xx bodies no longer break profile-switch cleanup handling.",
      "project_id": "support-and-on-call",
      "project_role": "core_contributor",
      "role_confidence": 0.86,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "id": "evt_2026-06-03_github_review_backoffice_annotation_tags",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T11:36:57+03:00",
      "source": "github",
      "action_type": "pull_request_reviewed",
      "title": "POT-2455: Tag read endpoints implementation",
      "summary": "Reviewed PR activity for tag read endpoints in the backoffice-annotation migration area.",
      "project_id": "webapp-ninjas-migration",
      "project_role": "reviewer",
      "role_confidence": 0.9,
      "role_reason": "The user reviewed or approved someone else's PR/design without owning delivery.",
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
      "id": "evt_2026-06-03_slack_balance_withdrawal_pdioc_655",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T13:00:00+03:00",
      "source": "slack",
      "action_type": "debugging_discussion",
      "title": "Balance withdrawal self-assignment investigation",
      "summary": "Investigated a balance-withdrawal/manual-authorisation issue where a workflow-created ticket appeared to be assigned back to the requester, and discussed safe handling.",
      "project_id": "support-and-on-call",
      "project_role": "core_contributor",
      "role_confidence": 0.82,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "project_role": "core_contributor",
      "role_confidence": 0.84,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "id": "evt_2026-06-03_github_ddcase_backlog_v1_pr12658",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T15:09:37+03:00",
      "source": "github",
      "action_type": "pull_request_opened",
      "title": "[POT-2391] chore: deprecate PayOps backlog v1",
      "summary": "Opened the dd-case side of PayOps backlog v1 deprecation work.",
      "project_id": "configurable-queue",
      "project_role": "core_contributor",
      "role_confidence": 0.82,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "id": "evt_2026-06-03_github_samurai_backlog_v1",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T15:31:42+03:00",
      "source": "github",
      "action_type": "pull_request_merged",
      "title": "[POT-2391] chore: deprecate backlog v1",
      "summary": "Merged the Samurai side of PayOps backlog v1 deprecation, keeping Routine backlog on the v2 path.",
      "project_id": "configurable-queue",
      "project_role": "core_contributor",
      "role_confidence": 0.82,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "action_type": "pull_request_merged",
      "title": "[NO JIRA] docs: add case assignment WFM refactor plan",
      "summary": "Merged the Routine case assignment and WFM status refactor plan documentation in Samurai.",
      "project_id": "configurable-queue",
      "project_role": "core_contributor",
      "role_confidence": 0.84,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "project_role": "core_contributor",
      "role_confidence": 0.82,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "id": "evt_2026-06-03_github_workflow_ui_pdioc_652",
      "date": "2026-06-03",
      "timestamp": "2026-06-03T17:07:22+03:00",
      "source": "github",
      "action_type": "pull_request_opened",
      "title": "[PDIOC-652] fix: render file deletion errors safely",
      "summary": "Opened the workflow-ui PR for safe rendering of file deletion errors.",
      "project_id": "support-and-on-call",
      "project_role": "core_contributor",
      "role_confidence": 0.86,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
      "confidence": 0.86,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-03.events.jsonl"
    },
    {
      "id": "evt_2026-06-04_calendar_pdi_q3_planning",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T09:00:00+03:00",
      "source": "google_calendar",
      "action_type": "meeting_attended",
      "title": "Payment Defects & Incidents Q3 planning",
      "summary": "Attended Payment Defects & Incidents Q3 planning.",
      "project_id": "support-and-on-call",
      "project_role": "observer",
      "role_confidence": 0.82,
      "role_reason": "The evidence is meeting attendance or background visibility only.",
      "confidence": 0.8,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-04.events.jsonl"
    },
    {
      "id": "evt_2026-06-04_github_review_samurai_pot2423",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T09:33:06+03:00",
      "source": "github",
      "action_type": "pull_request_reviewed",
      "title": "[POT-2423] Adding filtering for zendesk info request cases and updating decision forms",
      "summary": "Reviewed PR activity for Samurai-side Zendesk info request filtering and decision-form updates.",
      "project_id": "cross-team-escalations-zd-ddcase",
      "project_role": "reviewer",
      "role_confidence": 0.9,
      "role_reason": "The user reviewed or approved someone else's PR/design without owning delivery.",
      "confidence": 0.86,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-04.events.jsonl"
    },
    {
      "id": "evt_2026-06-04_calendar_escalations_pot_sync",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T09:45:00+03:00",
      "source": "google_calendar",
      "action_type": "meeting_attended",
      "title": "Escalations POT sync",
      "summary": "Attended recurring Escalations POT sync.",
      "project_id": "cross-team-escalations-zd-ddcase",
      "project_role": "observer",
      "role_confidence": 0.82,
      "role_reason": "The evidence is meeting attendance or background visibility only.",
      "confidence": 0.8,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-04.events.jsonl"
    },
    {
      "id": "evt_2026-06-04_github_ddcase_pdioc_653",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T10:41:24+03:00",
      "source": "github",
      "action_type": "pull_request_merged",
      "title": "[PDIOC-653] fix: support suspended transfer delay minutes",
      "summary": "Merged a dd-case fix allowing suspended transfer auto-snooze configuration to support delay minutes.",
      "project_id": "support-and-on-call",
      "project_role": "core_contributor",
      "role_confidence": 0.86,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "role_confidence": 0.82,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "action_type": "pull_request_merged",
      "title": "[POT-2411] fix: track warning on final send escalation",
      "summary": "Merged the final Send Case warning-tracking fix in plugin-twilio-flex for POT-2411.",
      "project_id": "cross-team-escalations-zd-ddcase",
      "project_role": "core_contributor",
      "role_confidence": 0.84,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "id": "evt_2026-06-04_github_workflow_ui_pdioc_655",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T14:03:59+03:00",
      "source": "github",
      "action_type": "pull_request_merged",
      "title": "[PDIOC-655] fix: prevent balance self-approval",
      "summary": "Opened and merged a workflow-ui fix to prevent balance self-approval/self-assignment in the support flow.",
      "project_id": "support-and-on-call",
      "project_role": "core_contributor",
      "role_confidence": 0.86,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
      "confidence": 0.86,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-04.events.jsonl"
    },
    {
      "id": "evt_2026-06-04_github_review_ddcase_pot2423_custom_keys",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T14:25:10+03:00",
      "source": "github",
      "action_type": "pull_request_reviewed",
      "title": "[POT-2423] Add logging of custom keys in zendesk ticket",
      "summary": "Reviewed PR activity for logging custom keys in Zendesk ticket sync.",
      "project_id": "cross-team-escalations-zd-ddcase",
      "project_role": "reviewer",
      "role_confidence": 0.9,
      "role_reason": "The user reviewed or approved someone else's PR/design without owning delivery.",
      "confidence": 0.86,
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
      "role_confidence": 0.86,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "id": "evt_2026-06-04_github_workflow_ui_pdioc_652_merged",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T14:44:05+03:00",
      "source": "github",
      "action_type": "pull_request_merged",
      "title": "[PDIOC-652] fix: render file deletion errors safely",
      "summary": "Merged the workflow-ui file deletion error rendering fix.",
      "project_id": "support-and-on-call",
      "project_role": "core_contributor",
      "role_confidence": 0.86,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
      "confidence": 0.86,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-04.events.jsonl"
    },
    {
      "id": "evt_2026-06-04_github_ddcase_pdioc_655_open",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T15:49:48+03:00",
      "source": "github",
      "action_type": "pull_request_opened",
      "title": "[PDIOC-655] fix: prevent balance withdrawal self assignment",
      "summary": "Opened the dd-case companion PR for preventing balance-withdrawal self assignment.",
      "project_id": "support-and-on-call",
      "project_role": "core_contributor",
      "role_confidence": 0.86,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
      "confidence": 0.86,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-04.events.jsonl"
    },
    {
      "id": "evt_2026-06-04_slack_gso_id_pdioc_654",
      "date": "2026-06-04",
      "timestamp": "2026-06-04T16:00:00+03:00",
      "source": "slack",
      "action_type": "support_request_triaged",
      "title": "PDIOC-654 GSO ID in Samurai",
      "summary": "Followed up on a request to display Global Switch Off ID in Samurai for suspended POIs and discussed where the ID should be exposed in API responses.",
      "project_id": "support-and-on-call",
      "project_role": "core_contributor",
      "role_confidence": 0.82,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "id": "evt_2026-06-05_calendar_regional_platform_offsite",
      "date": "2026-06-05",
      "timestamp": "2026-06-05T10:00:00+03:00",
      "source": "google_calendar",
      "action_type": "meeting_attended",
      "title": "Regional Platform Offsite",
      "summary": "Attended the Regional Platform Offsite.",
      "project_id": "support-and-on-call",
      "project_role": "core_contributor",
      "role_confidence": 0.8,
      "role_reason": "The evidence is meeting attendance or background visibility only.",
      "confidence": 0.6,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
      "decisions": [],
      "followups": [],
      "risks": [],
      "path": "events/2026/06/2026-06-05.events.jsonl"
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
      "project_role": "side_helper",
      "role_confidence": 0.78,
      "role_reason": "The user provided targeted support or one-off analysis without owning the broader project.",
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
      "id": "evt_2026-06-05_github_ddcase_pdioc_655_ci_followup",
      "date": "2026-06-05",
      "timestamp": "2026-06-05T10:27:59+03:00",
      "source": "github",
      "action_type": "pull_request_updated",
      "title": "[PDIOC-655] fix: prevent balance withdrawal self assignment",
      "summary": "Continued updating the dd-case PDIOC-655 PR for balance-withdrawal self-assignment prevention.",
      "project_id": "support-and-on-call",
      "project_role": "core_contributor",
      "role_confidence": 0.86,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
      "confidence": 0.86,
      "privacy_level": "internal",
      "safe_to_publish": false,
      "evidence_count": 2,
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
      "project_role": "core_contributor",
      "role_confidence": 0.88,
      "role_reason": "The user authored delivery work, proposed implementation direction, or materially advanced the thread.",
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
      "involvement_role": "core_contributor",
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
      "timeline_count": 18,
      "timeline": [
        {
          "date": "2026-06-04",
          "summary": "Attended Payment Defects & Incidents Q3 planning.",
          "event_id": "evt_2026-06-04_calendar_pdi_q3_planning",
          "confidence": 0.8
        },
        {
          "date": "2026-06-04",
          "summary": "Merged a dd-case fix allowing suspended transfer auto-snooze configuration to support delay minutes.",
          "event_id": "evt_2026-06-04_github_ddcase_pdioc_653",
          "confidence": 0.81
        },
        {
          "date": "2026-06-04",
          "summary": "Opened and merged a workflow-ui fix to prevent balance self-approval/self-assignment in the support flow.",
          "event_id": "evt_2026-06-04_github_workflow_ui_pdioc_655",
          "confidence": 0.86
        },
        {
          "date": "2026-06-04",
          "summary": "Merged the workflow-ui file deletion error rendering fix.",
          "event_id": "evt_2026-06-04_github_workflow_ui_pdioc_652_merged",
          "confidence": 0.86
        },
        {
          "date": "2026-06-04",
          "summary": "Opened the dd-case companion PR for preventing balance-withdrawal self assignment.",
          "event_id": "evt_2026-06-04_github_ddcase_pdioc_655_open",
          "confidence": 0.86
        },
        {
          "date": "2026-06-04",
          "summary": "Followed up on a request to display Global Switch Off ID in Samurai for suspended POIs and discussed where the ID should be exposed in API responses.",
          "event_id": "evt_2026-06-04_slack_gso_id_pdioc_654",
          "confidence": 0.82
        },
        {
          "date": "2026-06-05",
          "summary": "Marked or stated that two help-payment-defects-incidents support items were fixed.",
          "event_id": "evt_2026-06-05_slack_pdi_support_fixed",
          "confidence": 0.82
        },
        {
          "date": "2026-06-05",
          "summary": "Continued updating the dd-case PDIOC-655 PR for balance-withdrawal self-assignment prevention.",
          "event_id": "evt_2026-06-05_github_ddcase_pdioc_655_ci_followup",
          "confidence": 0.86
        }
      ],
      "decisions": [
        "2026-06-03: M2E auto-cancel timing should be treated as 10 working days; old 7-day webapp config is not used. (decision_2026-06-03_m2e_auto_cancel)."
      ],
      "decisions_count": 1,
      "followups": [
        "2026-06-03: Get workflow-ui PR 2809 reviewed. (fu_2026-06-03_workflow_ui_review).",
        "2026-06-03: Update documentation to reflect 10-working-day auto-cancel behavior. (fu_2026-06-03_m2e_doc_update).",
        "2026-06-03: Consider removing unused old 7-day webapp config/dead code later. (fu_2026-06-03_webapp_dead_code)."
      ],
      "followups_count": 3,
      "risks": [],
      "risks_count": 0,
      "role_counts": {
        "owner": 1,
        "observer": 3,
        "side_helper": 2,
        "core_contributor": 12
      },
      "recent_updates": [
        {
          "date": "2026-06-05",
          "title": "[PDIOC-655] fix: prevent balance withdrawal self assignment",
          "summary": "Continued updating the dd-case PDIOC-655 PR for balance-withdrawal self-assignment prevention.",
          "action_type": "pull_request_updated",
          "role": "core_contributor"
        },
        {
          "date": "2026-06-05",
          "title": "Regional Platform Offsite",
          "summary": "Attended the Regional Platform Offsite.",
          "action_type": "meeting_attended",
          "role": "unknown"
        },
        {
          "date": "2026-06-05",
          "title": "PDI support threads marked fixed",
          "summary": "Marked or stated that two help-payment-defects-incidents support items were fixed.",
          "action_type": "support_request_resolved",
          "role": "side_helper"
        },
        {
          "date": "2026-06-04",
          "title": "PDIOC-654 GSO ID in Samurai",
          "summary": "Followed up on a request to display Global Switch Off ID in Samurai for suspended POIs and discussed where the ID should be exposed in API responses.",
          "action_type": "support_request_triaged",
          "role": "core_contributor"
        }
      ],
      "event_count": 20,
      "daily_count": 5,
      "latest_date": "2026-06-05"
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
      "timeline_count": 10,
      "timeline": [
        {
          "date": "2026-06-02",
          "summary": "Opened the replacement POT-2411 Send Case final-warning tracking PR.",
          "event_id": "evt_2026-06-02_github_twilio_pot_2411_pr3038_open",
          "confidence": 0.79
        },
        {
          "date": "2026-06-02",
          "summary": "Reviewed PR activity related to Zendesk/DD-case sync currency and team mapping.",
          "event_id": "evt_2026-06-02_github_review_ddcase_pot2423_currency",
          "confidence": 0.84
        },
        {
          "date": "2026-06-02",
          "summary": "Reviewed PR activity for fallback currency/group logic in Zendesk IR case sync.",
          "event_id": "evt_2026-06-02_github_review_ddcase_pot2423_group",
          "confidence": 0.84
        },
        {
          "date": "2026-06-04",
          "summary": "Reviewed PR activity for Samurai-side Zendesk info request filtering and decision-form updates.",
          "event_id": "evt_2026-06-04_github_review_samurai_pot2423",
          "confidence": 0.86
        },
        {
          "date": "2026-06-04",
          "summary": "Attended recurring Escalations POT sync.",
          "event_id": "evt_2026-06-04_calendar_escalations_pot_sync",
          "confidence": 0.8
        },
        {
          "date": "2026-06-04",
          "summary": "Discussed ZD sync/custom-field extraction, including whether to fetch custom fields to populate transfer ID and whether contact-side contract changes or capacity were needed.",
          "event_id": "evt_2026-06-04_slack_zd_sync_custom_fields",
          "confidence": 0.9
        },
        {
          "date": "2026-06-04",
          "summary": "Merged the final Send Case warning-tracking fix in plugin-twilio-flex for POT-2411.",
          "event_id": "evt_2026-06-04_github_twilio_pot_2411",
          "confidence": 0.79
        },
        {
          "date": "2026-06-04",
          "summary": "Reviewed PR activity for logging custom keys in Zendesk ticket sync.",
          "event_id": "evt_2026-06-04_github_review_ddcase_pot2423_custom_keys",
          "confidence": 0.86
        }
      ],
      "decisions": [],
      "decisions_count": 0,
      "followups": [
        "2026-06-04: Verify whether ZD custom fields can be fetched and mapped to transfer ID. (fu_2026-06-04_zd_custom_fields).",
        "2026-06-04: Confirm whether contact-side event contract changes are needed before implementation. (fu_2026-06-04_contact_contract)."
      ],
      "followups_count": 2,
      "risks": [
        "2026-06-04: Discussion suggested the work may need to wait for contact-side owner/manpower. (risk_2026-06-04_zd_sync_capacity)."
      ],
      "risks_count": 1,
      "role_counts": {
        "core_contributor": 4,
        "observer": 2,
        "reviewer": 4
      },
      "recent_updates": [
        {
          "date": "2026-06-04",
          "title": "[POT-2423] Add logging of custom keys in zendesk ticket",
          "summary": "Reviewed PR activity for logging custom keys in Zendesk ticket sync.",
          "action_type": "pull_request_reviewed",
          "role": "reviewer"
        },
        {
          "date": "2026-06-04",
          "title": "[POT-2411] fix: track warning on final send escalation",
          "summary": "Merged the final Send Case warning-tracking fix in plugin-twilio-flex for POT-2411.",
          "action_type": "pull_request_merged",
          "role": "core_contributor"
        },
        {
          "date": "2026-06-04",
          "title": "ZD sync custom-field extraction discussion",
          "summary": "Discussed ZD sync/custom-field extraction, including whether to fetch custom fields to populate transfer ID and whether contact-side contract changes or capacity were needed.",
          "action_type": "requirements_discussion",
          "role": "core_contributor"
        },
        {
          "date": "2026-06-04",
          "title": "Escalations POT sync",
          "summary": "Attended recurring Escalations POT sync.",
          "action_type": "meeting_attended",
          "role": "observer"
        }
      ],
      "event_count": 10,
      "daily_count": 3,
      "latest_date": "2026-06-04"
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
      "timeline_count": 7,
      "timeline": [
        {
          "date": "2026-06-01",
          "summary": "Reviewed or participated in PR activity for PayOps catch-all queue alerting.",
          "event_id": "evt_2026-06-01_github_review_catch_all_alerting",
          "confidence": 0.82
        },
        {
          "date": "2026-06-01",
          "summary": "Discussed configurable queue behavior, including catch-all handling for system alert cases and possible tooling around JEXL/config organization.",
          "event_id": "evt_2026-06-01_slack_config_queue_system_alert",
          "confidence": 0.87
        },
        {
          "date": "2026-06-02",
          "summary": "Asked about removing old PayOps queue configs and using the config queue team-group column, offering to split/help with the task.",
          "event_id": "evt_2026-06-02_slack_config_queue_cleanup",
          "confidence": 0.91
        },
        {
          "date": "2026-06-02",
          "summary": "Explored the idea of a Java repository/tool to run JEXL routing expressions for configurable queue validation.",
          "event_id": "evt_2026-06-02_slack_jexl_verifier_idea",
          "confidence": 0.86
        },
        {
          "date": "2026-06-03",
          "summary": "Opened the dd-case side of PayOps backlog v1 deprecation work.",
          "event_id": "evt_2026-06-03_github_ddcase_backlog_v1_pr12658",
          "confidence": 0.78
        },
        {
          "date": "2026-06-03",
          "summary": "Merged the Samurai side of PayOps backlog v1 deprecation, keeping Routine backlog on the v2 path.",
          "event_id": "evt_2026-06-03_github_samurai_backlog_v1",
          "confidence": 0.78
        },
        {
          "date": "2026-06-03",
          "summary": "Merged the Routine case assignment and WFM status refactor plan documentation in Samurai.",
          "event_id": "evt_2026-06-03_github_samurai_wfm_plan",
          "confidence": 0.8
        }
      ],
      "decisions": [],
      "decisions_count": 0,
      "followups": [
        "2026-06-01: Confirm whether system alert cases should be excluded from catch-all queues. (fu_2026-06-01_config_queue_system_alert).",
        "2026-06-02: Split or coordinate old-config removal work with Michelle. (fu_2026-06-02_config_queue_cleanup_split).",
        "2026-06-02: Think through local/offline JEXL validation design for queue routing. (fu_2026-06-02_jexl_verifier)."
      ],
      "followups_count": 3,
      "risks": [],
      "risks_count": 0,
      "role_counts": {
        "reviewer": 1,
        "core_contributor": 6
      },
      "recent_updates": [
        {
          "date": "2026-06-03",
          "title": "[NO JIRA] docs: add case assignment WFM refactor plan",
          "summary": "Merged the Routine case assignment and WFM status refactor plan documentation in Samurai.",
          "action_type": "pull_request_merged",
          "role": "core_contributor"
        },
        {
          "date": "2026-06-03",
          "title": "[POT-2391] chore: deprecate backlog v1",
          "summary": "Merged the Samurai side of PayOps backlog v1 deprecation, keeping Routine backlog on the v2 path.",
          "action_type": "pull_request_merged",
          "role": "core_contributor"
        },
        {
          "date": "2026-06-03",
          "title": "[POT-2391] chore: deprecate PayOps backlog v1",
          "summary": "Opened the dd-case side of PayOps backlog v1 deprecation work.",
          "action_type": "pull_request_opened",
          "role": "core_contributor"
        },
        {
          "date": "2026-06-02",
          "title": "System-alert case forwarding consultation",
          "summary": "Asked whether system alert cases can be forwarded to other teams and who should be consulted.",
          "action_type": "requirements_question",
          "role": "unknown"
        }
      ],
      "event_count": 8,
      "daily_count": 3,
      "latest_date": "2026-06-03"
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
      "timeline_count": 2,
      "timeline": [
        {
          "date": "2026-06-02",
          "summary": "Shared the PayOps Automation Process Paradigm and Framework Capabilities RFC and discussed whether to pursue that framework direction.",
          "event_id": "evt_2026-06-02_slack_automation_framework",
          "confidence": 0.88
        },
        {
          "date": "2026-06-02",
          "summary": "Attended a sync about next steps for AI automation technology.",
          "event_id": "evt_2026-06-02_calendar_ai_automation_sync",
          "confidence": 0.78
        }
      ],
      "decisions": [],
      "decisions_count": 0,
      "followups": [
        "2026-06-02: Clarify whether the team should invest in the automation framework direction. (fu_2026-06-02_automation_framework_decision)."
      ],
      "followups_count": 1,
      "risks": [
        "2026-06-02: Framework scope and ownership remained unsettled based on Slack/planning discussion. (risk_2026-06-02_framework_ambiguity)."
      ],
      "risks_count": 1,
      "role_counts": {
        "core_contributor": 1,
        "observer": 1
      },
      "recent_updates": [
        {
          "date": "2026-06-02",
          "title": "Sync Up on AI Automation Tech Next Step",
          "summary": "Attended a sync about next steps for AI automation technology.",
          "action_type": "meeting_attended",
          "role": "observer"
        },
        {
          "date": "2026-06-02",
          "title": "Zizheng / Amanda",
          "summary": "Attended a 1:1/sync with Amanda; project mapping is inferred from the same-day automation-framework discussion.",
          "action_type": "meeting_attended",
          "role": "unknown"
        },
        {
          "date": "2026-06-02",
          "title": "PayOps automation framework RFC shared",
          "summary": "Shared the PayOps Automation Process Paradigm and Framework Capabilities RFC and discussed whether to pursue that framework direction.",
          "action_type": "project_planning",
          "role": "core_contributor"
        }
      ],
      "event_count": 3,
      "daily_count": 1,
      "latest_date": "2026-06-02"
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
      "timeline_count": 1,
      "timeline": [
        {
          "date": "2026-06-03",
          "summary": "Reviewed PR activity for tag read endpoints in the backoffice-annotation migration area.",
          "event_id": "evt_2026-06-03_github_review_backoffice_annotation_tags",
          "confidence": 0.8
        }
      ],
      "decisions": [],
      "decisions_count": 0,
      "followups": [],
      "followups_count": 0,
      "risks": [],
      "risks_count": 0,
      "role_counts": {
        "reviewer": 1
      },
      "recent_updates": [
        {
          "date": "2026-06-03",
          "title": "POT-2455: Tag read endpoints implementation",
          "summary": "Reviewed PR activity for tag read endpoints in the backoffice-annotation migration area.",
          "action_type": "pull_request_reviewed",
          "role": "reviewer"
        },
        {
          "date": "2026-06-01",
          "title": "Ninjas deprecation context in PR/dev channel",
          "summary": "Participated in a public payment-ops-tooling-dev discussion about behavior that might be removed during Ninjas deprecation.",
          "action_type": "code_review_or_context_reply",
          "role": "unknown"
        }
      ],
      "event_count": 2,
      "daily_count": 1,
      "latest_date": "2026-06-03"
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
        "projects/active/case-based-access",
        "projects/active/case-based-access.yaml"
      ],
      "timeline_count": 1,
      "timeline": [
        {
          "date": "2026-06-02",
          "summary": "Calendar shows attendance or invitation for CBA weekly sync; no direct contribution is inferred from metadata alone.",
          "event_id": "evt_2026-06-02_calendar_cba_weekly_sync",
          "confidence": 0.78
        }
      ],
      "decisions": [],
      "decisions_count": 0,
      "followups": [],
      "followups_count": 0,
      "risks": [],
      "risks_count": 0,
      "role_counts": {
        "observer": 1
      },
      "recent_updates": [
        {
          "date": "2026-06-02",
          "title": "CBA weekly sync",
          "summary": "Calendar shows attendance or invitation for CBA weekly sync; no direct contribution is inferred from metadata alone.",
          "action_type": "meeting_attended",
          "role": "observer"
        }
      ],
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
      "timeline": [
        {
          "date": "2026-06-04",
          "summary": "Posted a proposal about allowing an internal account to transfer to recipients from other accounts, motivated by EMPOI recipient-copy edge cases and special logic.",
          "event_id": "evt_2026-06-04_slack_empoi_internal_account",
          "confidence": 0.9
        }
      ],
      "decisions": [],
      "decisions_count": 0,
      "followups": [
        "2026-06-04: Get feedback from transfer/public-transfer owners on internal account recipient ownership proposal. (fu_2026-06-04_empoi_internal_account).",
        "2026-06-04: Ask Contacts whether recipient-copy support can be standardized. (fu_2026-06-04_standard_recipient_copy)."
      ],
      "followups_count": 2,
      "risks": [
        "2026-06-04: Recipient-copy edge cases have accumulated special logic and may keep increasing implementation complexity. (risk_2026-06-04_empoi_edge_cases)."
      ],
      "risks_count": 1,
      "role_counts": {
        "core_contributor": 1
      },
      "recent_updates": [
        {
          "date": "2026-06-04",
          "title": "EMPOI internal-account transfer proposal",
          "summary": "Posted a proposal about allowing an internal account to transfer to recipients from other accounts, motivated by EMPOI recipient-copy edge cases and special logic.",
          "action_type": "proposal_shared",
          "role": "core_contributor"
        }
      ],
      "event_count": 1,
      "daily_count": 1,
      "latest_date": "2026-06-04"
    },
    {
      "id": "work-memory",
      "name": "Personal work memory",
      "status": "active",
      "themes": [],
      "role": "Unspecified role",
      "involvement_role": "core_contributor",
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
      "timeline": [
        {
          "date": "2026-06-05",
          "summary": "Shared the wise-personal-momory-pluging repository and seed source links for initializing personal work memory.",
          "event_id": "evt_2026-06-05_slack_work_memory_seed_request",
          "confidence": 0.95
        }
      ],
      "decisions": [],
      "decisions_count": 0,
      "followups": [],
      "followups_count": 0,
      "risks": [],
      "risks_count": 0,
      "role_counts": {
        "core_contributor": 1
      },
      "recent_updates": [
        {
          "date": "2026-06-05",
          "title": "Personal work-memory plugin context shared",
          "summary": "Shared the wise-personal-momory-pluging repository and seed source links for initializing personal work memory.",
          "action_type": "tooling_context_shared",
          "role": "core_contributor"
        }
      ],
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
      "timeline": [
        {
          "date": "2026-06-02",
          "summary": "Helped explain retry-control alert behavior: detected POIs in the window can differ from suspended transfers shown in exports.",
          "event_id": "evt_2026-06-02_slack_retry_control_support",
          "confidence": 0.84
        }
      ],
      "decisions": [],
      "decisions_count": 0,
      "followups": [],
      "followups_count": 0,
      "risks": [],
      "risks_count": 0,
      "role_counts": {
        "side_helper": 1
      },
      "recent_updates": [
        {
          "date": "2026-06-02",
          "title": "Retry-control POI-count support explanation",
          "summary": "Helped explain retry-control alert behavior: detected POIs in the window can differ from suspended transfers shown in exports.",
          "action_type": "support_analysis",
          "role": "side_helper"
        }
      ],
      "event_count": 1,
      "daily_count": 1,
      "latest_date": "2026-06-02"
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
      "recent_updates": [],
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
      "project_count": 8,
      "event_count": 44,
      "projects": [
        "support-and-on-call",
        "cross-team-escalations-zd-ddcase",
        "configurable-queue",
        "automating-ops-tasks",
        "case-based-access",
        "extra-money-payouts",
        "work-memory",
        "manual-internal-transfers"
      ]
    },
    {
      "name": "side_helper",
      "label": "Side helper",
      "project_count": 2,
      "event_count": 3,
      "projects": [
        "webapp-ninjas-migration",
        "retry-volume-control"
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
      "covered_true_count": 3,
      "covered_false_count": 2
    },
    {
      "source": "github",
      "event_count": 20,
      "covered_true_count": 5,
      "covered_false_count": 0
    },
    {
      "source": "gmail",
      "event_count": 0,
      "covered_true_count": 0,
      "covered_false_count": 5
    },
    {
      "source": "google_calendar",
      "event_count": 10,
      "covered_true_count": 5,
      "covered_false_count": 0
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
      "covered_true_count": 3,
      "covered_false_count": 2
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
        "generated_at": "2026-06-05T13:24:23+03:00",
        "source_daily_records": [
          "2026-06-01",
          "2026-06-02",
          "2026-06-03",
          "2026-06-04",
          "2026-06-05"
        ],
        "confidence": 0.83,
        "projects_touched": {
          "support-and-on-call": 18,
          "cross-team-escalations-zd-ddcase": 10,
          "configurable-queue": 7,
          "automating-ops-tasks": 2,
          "retry-volume-control": 1,
          "case-based-access": 1,
          "webapp-ninjas-migration": 1,
          "extra-money-payouts": 1,
          "work-memory": 1
        },
        "project_role_counts": {
          "support-and-on-call": {
            "owner": 1,
            "observer": 3,
            "side_helper": 2,
            "core_contributor": 12
          },
          "cross-team-escalations-zd-ddcase": {
            "core_contributor": 4,
            "observer": 2,
            "reviewer": 4
          },
          "configurable-queue": {
            "reviewer": 1,
            "core_contributor": 6
          },
          "automating-ops-tasks": {
            "core_contributor": 1,
            "observer": 1
          },
          "retry-volume-control": {
            "side_helper": 1
          },
          "case-based-access": {
            "observer": 1
          },
          "webapp-ninjas-migration": {
            "reviewer": 1
          },
          "extra-money-payouts": {
            "core_contributor": 1
          },
          "work-memory": {
            "core_contributor": 1
          }
        },
        "open_followups": [
          "Ask Contacts whether recipient-copy support can be standardized.",
          "Clarify whether the team should invest in the automation framework direction.",
          "Confirm whether contact-side event contract changes are needed before implementation.",
          "Confirm whether system alert cases should be excluded from catch-all queues.",
          "Consider removing unused old 7-day webapp config/dead code later.",
          "Find the right owner/consultant for system alert case forwarding policy.",
          "Get feedback from transfer/public-transfer owners on internal account recipient ownership proposal.",
          "Get workflow-ui PR 2809 reviewed.",
          "Split or coordinate old-config removal work with Michelle.",
          "Think through local/offline JEXL validation design for queue routing.",
          "Update documentation to reflect 10-working-day auto-cancel behavior.",
          "Verify whether ZD custom fields can be fetched and mapped to transfer ID."
        ],
        "unclassified_event_count": 5,
        "source_gaps": [
          "private_slack_dm_not_queried_by_default",
          "full_jira_changelog_not_fetched",
          "gmail_disabled_or_not_queried",
          "gdocs_body_not_queried",
          "2026-06-05_same_day_partial_record"
        ],
        "executive_summary": "Updated records for 2026-06-01 through 2026-06-05 show a week split across support/on-call delivery, configurable queue/routing cleanup, cross-team escalation/ZD sync, EMPOI architecture discussion, automation planning, and personal work-memory initiali",
        "main_outcomes": [
          "Support/on-call: PDIOC-649, PDIOC-652, PDIOC-653, PDIOC-655, PDIOC-654, M2E auto-cancel, and PDI support closures advanced.",
          "Configurable queue: old-config cleanup, catch-all/system-alert routing questions, JEXL validation thinking, backlog v1 deprecation, WFM planning, and catch-all alerting review moved forward.",
          "Cross-team escalations: POT-2411 warning tracking landed; POT-2423 ZD sync reviews and custom-field/contract questions progressed.",
          "EMPOI: internal-account transfer and standard recipient-copy support were raised as architecture concerns.",
          "Automation: PayOps automation framework and AI automation next steps received planning attention.",
          "Work memory: the local trace was initiali"
        ],
        "project_progress": [
          {
            "project_id": "support-and-on-call",
            "name": "Support and on-call",
            "moved_forward": "Support and on-call activity including PDIOC support, fixes, on-call health review, and support follow-through.",
            "decisions": "decision_2026-06-03_m2e_auto_cancel",
            "followups": "fu_2026-06-03_workflow_ui_review; fu_2026-06-03_m2e_doc_update; fu_2026-06-03_webapp_dead_code",
            "risks": "none captured"
          },
          {
            "project_id": "cross-team-escalations-",
            "name": "Cross Team Escalations ",
            "moved_forward": "",
            "decisions": "",
            "followups": "",
            "risks": ""
          }
        ],
        "path": "weekly/2026/2026-W23.summary.json"
      }
    ],
    "monthly": [
      {
        "record_type": "monthly_summary",
        "month": "2026-06",
        "generated_at": "2026-06-05T13:24:23+03:00",
        "source_weekly_records": [
          "2026-W23"
        ],
        "source_daily_records": [
          "2026-06-01",
          "2026-06-02",
          "2026-06-03",
          "2026-06-04",
          "2026-06-05"
        ],
        "confidence": 0.83,
        "projects_touched": {
          "support-and-on-call": 18,
          "cross-team-escalations-zd-ddcase": 10,
          "configurable-queue": 7,
          "automating-ops-tasks": 2,
          "retry-volume-control": 1,
          "case-based-access": 1,
          "webapp-ninjas-migration": 1,
          "extra-money-payouts": 1,
          "work-memory": 1
        },
        "project_role_counts": {
          "support-and-on-call": {
            "owner": 1,
            "observer": 3,
            "side_helper": 2,
            "core_contributor": 12
          },
          "cross-team-escalations-zd-ddcase": {
            "core_contributor": 4,
            "observer": 2,
            "reviewer": 4
          },
          "configurable-queue": {
            "reviewer": 1,
            "core_contributor": 6
          },
          "automating-ops-tasks": {
            "core_contributor": 1,
            "observer": 1
          },
          "retry-volume-control": {
            "side_helper": 1
          },
          "case-based-access": {
            "observer": 1
          },
          "webapp-ninjas-migration": {
            "reviewer": 1
          },
          "extra-money-payouts": {
            "core_contributor": 1
          },
          "work-memory": {
            "core_contributor": 1
          }
        },
        "coverage": "partial_month_2026-06-01_to_2026-06-05",
        "source_gaps": [
          "missing_dates_2026-06-06_to_2026-06-30",
          "full_jira_changelog_not_fetched",
          "private_slack_dm_not_queried_by_default"
        ],
        "executive_summary": "June 2026 is only partially covered so far: this rollup uses records from 2026-06-01 through 2026-06-05 and weekly rollup 2026-W23. It should be treated as an early-month partial summary, not a complete month.",
        "main_outcomes": [],
        "project_progress": [],
        "open_followups": [],
        "path": "monthly/2026/2026-06.summary.json"
      }
    ],
    "quarterly": [
      {
        "record_type": "quarterly_summary",
        "quarter": "2026-Q2",
        "generated_at": "2026-06-05T13:24:23+03:00",
        "source_monthly_records": [
          "2026-06"
        ],
        "confidence": 0.83,
        "coverage": "partial_q2_from_2026-06-01_to_2026-06-05",
        "projects_touched": {
          "support-and-on-call": 18,
          "cross-team-escalations-zd-ddcase": 10,
          "configurable-queue": 7,
          "automating-ops-tasks": 2,
          "retry-volume-control": 1,
          "case-based-access": 1,
          "webapp-ninjas-migration": 1,
          "extra-money-payouts": 1,
          "work-memory": 1
        },
        "project_role_counts": {
          "support-and-on-call": {
            "owner": 1,
            "observer": 3,
            "side_helper": 2,
            "core_contributor": 12
          },
          "cross-team-escalations-zd-ddcase": {
            "core_contributor": 4,
            "observer": 2,
            "reviewer": 4
          },
          "configurable-queue": {
            "reviewer": 1,
            "core_contributor": 6
          },
          "automating-ops-tasks": {
            "core_contributor": 1,
            "observer": 1
          },
          "retry-volume-control": {
            "side_helper": 1
          },
          "case-based-access": {
            "observer": 1
          },
          "webapp-ninjas-migration": {
            "reviewer": 1
          },
          "extra-money-payouts": {
            "core_contributor": 1
          },
          "work-memory": {
            "core_contributor": 1
          }
        },
        "source_gaps": [
          "missing_q2_records_before_2026-06-01",
          "missing_june_dates_after_2026-06-05",
          "full_jira_changelog_not_fetched",
          "private_slack_dm_not_queried_by_default"
        ],
        "executive_summary": "",
        "main_outcomes": [],
        "project_progress": [],
        "open_followups": [],
        "path": "quarterly/2026/2026-Q2.summary.json"
      }
    ]
  },
  "signals": {
    "followups": [
      "Ask Contacts whether recipient-copy support can be standardized.",
      "Automating Ops tasks: 2026-06-02: Clarify whether the team should invest in the automation framework direction. (fu_2026-06-02_automation_framework_decision).",
      "Clarify whether the team should invest in the automation framework direction.",
      "Configurable queue: 2026-06-01: Confirm whether system alert cases should be excluded from catch-all queues. (fu_2026-06-01_config_queue_system_alert).",
      "Configurable queue: 2026-06-02: Split or coordinate old-config removal work with Michelle. (fu_2026-06-02_config_queue_cleanup_split).",
      "Configurable queue: 2026-06-02: Think through local/offline JEXL validation design for queue routing. (fu_2026-06-02_jexl_verifier).",
      "Confirm whether contact-side event contract changes are needed before implementation.",
      "Confirm whether system alert cases should be excluded from catch-all queues.",
      "Consider removing unused old 7-day webapp config/dead code later.",
      "Cross team escalation (ZD <> ddcase sync): 2026-06-04: Confirm whether contact-side event contract changes are needed before implementation. (fu_2026-06-04_contact_contract).",
      "Cross team escalation (ZD <> ddcase sync): 2026-06-04: Verify whether ZD custom fields can be fetched and mapped to transfer ID. (fu_2026-06-04_zd_custom_fields).",
      "Extra Money Payouts: 2026-06-04: Ask Contacts whether recipient-copy support can be standardized. (fu_2026-06-04_standard_recipient_copy).",
      "Extra Money Payouts: 2026-06-04: Get feedback from transfer/public-transfer owners on internal account recipient ownership proposal. (fu_2026-06-04_empoi_internal_account).",
      "Find the right owner/consultant for system alert case forwarding policy.",
      "Get feedback from transfer/public-transfer owners on internal account recipient ownership proposal.",
      "Get workflow-ui PR 2809 reviewed.",
      "Split or coordinate old-config removal work with Michelle.",
      "Support and on-call: 2026-06-03: Consider removing unused old 7-day webapp config/dead code later. (fu_2026-06-03_webapp_dead_code).",
      "Support and on-call: 2026-06-03: Get workflow-ui PR 2809 reviewed. (fu_2026-06-03_workflow_ui_review).",
      "Support and on-call: 2026-06-03: Update documentation to reflect 10-working-day auto-cancel behavior. (fu_2026-06-03_m2e_doc_update).",
      "Think through local/offline JEXL validation design for queue routing.",
      "Update documentation to reflect 10-working-day auto-cancel behavior.",
      "Verify whether ZD custom fields can be fetched and mapped to transfer ID."
    ],
    "risks": [
      "Automating Ops tasks: 2026-06-02: Framework scope and ownership remained unsettled based on Slack/planning discussion. (risk_2026-06-02_framework_ambiguity).",
      "Cross team escalation (ZD <> ddcase sync): 2026-06-04: Discussion suggested the work may need to wait for contact-side owner/manpower. (risk_2026-06-04_zd_sync_capacity).",
      "Discussion suggested the work may need to wait for contact-side owner/manpower.",
      "Extra Money Payouts: 2026-06-04: Recipient-copy edge cases have accumulated special logic and may keep increasing implementation complexity. (risk_2026-06-04_empoi_edge_cases).",
      "Framework scope and ownership remained unsettled based on Slack/planning discussion.",
      "Recipient-copy edge cases have accumulated special logic and may keep increasing implementation complexity."
    ],
    "source_gaps": [
      "2026-06-05_same_day_partial_record",
      "full_jira_changelog_not_fetched",
      "gdocs_body_not_queried",
      "gmail_disabled_or_not_queried",
      "manual_supplement_prompted_no_new_data",
      "missing_dates_2026-06-06_to_2026-06-30",
      "missing_june_dates_after_2026-06-05",
      "missing_q2_records_before_2026-06-01",
      "private_slack_dm_not_queried_by_default",
      "same_day_partial_record"
    ]
  }
};
