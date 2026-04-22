# Security Specification for SmartCard US

## Data Invariants
1. A card cannot exist without a name, issuer, type, and annual fee.
2. Only authorized administrators (listed in the `/admins/` collection) can create, update, or delete cards.
3. Every card must have a valid `type` and `creditScore` matching the system enums.
4. Users can read all cards to see recommendations.
5. Administrative status is verified by the existence of a document in the `admins` collection matching the user's `uid`.

## The Dirty Dozen Payloads (Target: Deny)
1. **Unauthenticated Card Creation**: Attempt to add a card without signing in.
2. **Unauthorized Card Creation**: Authenticated user (not in `admins`) attempts to add a card.
3. **Admin Self-Promotion**: User attempts to write their own ID into the `admins` collection.
4. **Invalid Card Type**: Creating a card with `type: "Free Money"`.
5. **Giant Payload Attack**: Attempting to save a 1MB string in the `name` field.
6. **Card ID Poisoning**: Using a malicious string like `../../system/root` as a card ID.
7. **Malicious Link Injection**: Injecting a `javascript:alert(1)` URL into the `referralUrl`.
8. **Invalid Annual Fee**: Setting an annual fee to a negative number or a string.
9. **Orphaned Write**: Updating a card field that isn't whitelisted.
10. **Admin Escalation**: An existing admin trying to change another admin's email.
11. **PII Leakage**: Attempting to read a sensitive field that shouldn't exist in `cards`.
12. **Bulk Scrape**: Unauthorized list query attempting to bypass filters.

## The Fortress Rules (Draft)
Available in `DRAFT_firestore.rules`.
