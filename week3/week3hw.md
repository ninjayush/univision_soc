### UI State Flow

```mermaid
stateDiagram-v2
    [*] --> Disconnected : Initialization
    Disconnected --> Connecting : User selects source
    Connecting --> ConnectionError : WebSocket timeout
    ConnectionError --> Connecting : Retry connection
    Connecting --> LiveStreaming : Handshake successful
    
    state LiveStreaming {
        [*] --> Monitoring
        Monitoring --> AnomalyDetected : Confidence < Threshold
        AnomalyDetected --> AlertMode : Trigger UI Flash
        AlertMode --> Monitoring : Operator Acknowledges
    }