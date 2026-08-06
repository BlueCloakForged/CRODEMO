<div align="center">

# Cyber Range Orchestrator

**Design, deploy, and run cyber ranges — topology, automation, and access, in one place.**

Cyber Range Orchestrator (CRO) is a platform for building isolated virtual
network environments used for security training, red/blue-team exercises,
and research. Ranges are designed on a topology canvas, provisioned from
reusable device templates, configured with Ansible, and controlled with
scheduled tasks.

[Static Demo](https://bluecloakforged.github.io/CRODEMO/) |
[What CRO Does](#what-cro-does) |
[Demo Scope](#demo-scope) |
[Screens](#screens-in-this-demo) |
[Local Preview](#running-this-demo-locally)

</div>

## Static Public Demo

A static, precomputed demo of the CRO UI is available at
**[⟶ Static Demo](https://bluecloakforged.github.io/CRODEMO/)**.

It reproduces the real application's navigation, layout, and terminology —
login, projects, the topology/map editor, devices, automation, tasks, and
administration — using sample, invented data. It does not run a backend,
does not authenticate, does not deploy or provision anything, and does not
run real Ansible automation. It exists so someone outside the project can
click through and understand what the product does without needing an
account, a lab, or the source tree running.

## What CRO Does

- **Topology design** — drag devices (routers, switches, firewalls, servers,
  workstations) onto a canvas and wire them into a network, in Logical,
  Physical, or Entity views.
- **Device templates** — reusable OS images and install profiles (Windows
  Server, Ubuntu, Kali, pfSense, …) with login profiles and cloud-init.
- **Libraries** — shared media/icons, lookup data, and configuration
  templates reused across projects.
- **Logins** — connection profiles, credential sets, and SSH keys used to
  reach deployed hosts.
- **Automation** — Ansible playbooks to harden, configure, and inject
  scenario content into range hosts.
- **Tasks** — scheduled or one-off jobs: power actions, snapshots, shell
  commands, and webhook calls.
- **Administration** — users, roles, and instance-wide settings (LDAP, map
  preferences, appearance).

## Demo Scope

| In this demo | Not in this demo |
|---|---|
| Real nav structure, page layout, and copy | Live backend / API |
| Interactive topology canvas (add a device, click a node) | Authentication |
| Sample data across all major sections | Real Ansible execution |
| Light/dark theme matching the real app | Every sub-dialog of the real app |

## Screens in this demo

`Login → Home → Projects → Map/Topology Editor → Devices → Libraries → Logins → Automation (Ansible) → Tasks → History → User Management → Settings`

## Running this demo locally

This is a static site with no build step or dependencies.

```bash
cd static-demo
python3 -m http.server 8080
# then open http://localhost:8080
```

Or just open `index.html` directly in a browser.

## Publishing to GitHub Pages

This repo is published via GitHub Pages from the `main` branch root at
**https://bluecloakforged.github.io/CRODEMO/**.
