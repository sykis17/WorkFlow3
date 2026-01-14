---
sidebar_position: 1
---

import WorkerDashboard from '@site/src/components/WorkerDashboard';
import OperationalDash from '@site/src/components/OperationalDash';

# Tervetuloa
## Vaihe 1: Aloitus {#step-1}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <WorkerDashboard />
  <OperationalDash />
</div>

graph TD
  A[Aloitus] --> B{Onko 1abc2a tehty?}
  B -- Kyllä --> C[Jatka vaiheeseen 2]
  B -- Ei --> D[Lue ohje 1abc2a]