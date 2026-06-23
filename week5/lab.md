# Lab

graph LR
    A[Camera Source `<br/>`Out: Image] -->|Image| B(Grayscale Filter `<br/>`In: Image | Out: Image)
    B -->|Image| C(OCR Engine `<br/>`In: Image | Out: TextList)
    C -->|TextList| D{Data Filter `<br/>`In: TextList | Out: JSON}

    %% Invalid connection example for validation testing
    %% D -->|JSON| B

## Manual Validation (Topological Sorting)

To validate this, a computer does a Topological Sort. This means it lines up the blocks in a straight line so that no block executes before it has its required data.

**Your Manual Trace:**

Block A (Camera Source): Has no inputs. It goes first. (Execution Order: 1)

Block B (Grayscale): Needs Image. Block A provides Image. Port types match. It goes second. (Execution Order: 2)

Block C (OCR): Needs Image. Block B provides Image. Port types match. It goes third. (Execution Order: 3)

Block D (Filter): Needs TextList. Block C provides TextList. Port types match. It goes fourth. (Execution Order: 4)

Validation Result: [PASS]. The graph is a Directed Acyclic Graph (DAG). There are no infinite loops, and all data ports plug into compatible sockets.
