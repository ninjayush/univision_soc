# Week 5 Homework: Graph Validation Checklist

Before the Uni_Vision backend attempts to execute a user-created pipeline, the graph must pass all of the following validation checks. If any check fails, the API must return a `400 Bad Request` with the specific error.

### 1. Cycle Detection (DAG Constraint)

- [ ] **No Infinite Loops:** The graph must be a Directed Acyclic Graph (DAG). Data must flow strictly forward. A block cannot feed data back into itself or into an ancestor block.

### 2. Port Type Safety

- [ ] **Data Compatibility:** Every edge (connection) must connect an Output Port to an Input Port of the exact same data type.
  - *Example Pass:* `Image` -> `Image`
  - *Example Fail:* `List[String]` -> `Image`
- [ ] **Array/Single Matching:** A port expecting a single object cannot accept an array of objects unless an iterator block is placed between them.

### 3. Arity and Requirements

- [ ] **Mandatory Inputs Full:** Every Input Port marked as `required=true` must have at least one incoming connection.
- [ ] **Sink Verification:** The graph must end in at least one terminal block (a Sink) that exports data, writes to a database, or triggers an alert. Graphs that process data into nothing are invalid.

### 4. Graph Connectivity

- [ ] **No Orphaned Blocks:** Every block on the canvas must be connected to the main pipeline.
- [ ] **Source Verification:** The graph must start with at least one Source block (e.g., Camera, Video File, Mock Data) that requires no inputs to run.

### 5. Executability (Topological Sort)

- [ ] **Sortable:** The graph engine must be able to generate a strict, linear execution array (Topological Sort) before runtime.
