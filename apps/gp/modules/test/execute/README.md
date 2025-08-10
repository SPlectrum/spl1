# gp/test/execute  

## Purpose
Orchestrates test isolation: creates unique workspace → runs tests → cleanup with audit

## Pipeline
1. `gp/config/set-session-working-dir --path=/tmp`
2. `gp/test/run` (with forwarded module parameter)
3. `gp/config/clear-session-working-dir`

## Isolation Strategy
- Sets `appDataRoot` to `/tmp` for complete isolation
- Forwards module filter parameter to run method
- Restores original `appDataRoot` after execution

## Key Pattern
All tests run in isolated `/tmp` environment, ensuring no interference with production data or other test runs.