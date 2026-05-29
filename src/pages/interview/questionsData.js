// Professional Interview Questions Database for VerveAI
// Contains 100+ highly tailored questions with target roles, companies, levels, categories, follow-ups, and custom AI hints.

export const interviewQuestions = [
  // ==================== TECHNICAL - FRONTEND & FULL STACK ====================
  {
    id: 1,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Frontend Developer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "Explain the concept of the Virtual DOM and how reconciliation diffs the tree structure to update the real DOM.",
    followUp: "Why is direct DOM manipulation slower in terms of browser rendering cycles?",
    hint: "💡 **AI Strategy (Virtual DOM Diffing):**\n- Explain the lightweight JS representation of the DOM.\n- Explain the O(n) heuristic reconciliation algorithm.\n- Mention batching updates and avoiding unnecessary repaints/reflows.\n- Highlight the significance of the 'key' prop in list diffing."
  },
  {
    id: 2,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Frontend Developer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "How do micro-frontends work, and what are the primary strategies for state sharing and routing coordination between isolated frontends?",
    followUp: "How do you handle dependency sharing and avoid version clashes in Module Federation?",
    hint: "💡 **AI Strategy (Micro-Frontends):**\n- Discuss Run-time integration via Web Components, Module Federation, or Single-SPA.\n- State sharing: Custom Events, Web Workers, or a light shared state bus.\n- CSS isolation: Shadow DOM, CSS Modules, or scoped CSS.\n- CI/CD independent deployments."
  },
  {
    id: 3,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Frontend Developer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "What is the difference between client-side rendering (CSR), server-side rendering (SSR), and static site generation (SSG)?",
    followUp: "When would you prefer Incremental Static Regeneration (ISR) over traditional SSR?",
    hint: "💡 **AI Strategy (Rendering Strategies):**\n- CSR: Fast navigation, poor initial SEO/load time (heavy JS bundle).\n- SSR: Great SEO, fast First Contentful Paint, but server load is higher on every request.\n- SSG: Maximum speed/security, built at compile time; bad for frequently changing dynamic data.\n- ISR: Regenerates background pages on-demand without full re-builds."
  },
  {
    id: 4,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Frontend Developer', 'Full Stack Developer'],
    companies: ['Google', 'Meta', 'Netflix'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Detail the critical rendering path of a browser and explain how CSS/JS execution blocks parser processing.",
    followUp: "How do 'defer' and 'async' script tags modify the HTML parsing pipeline?",
    hint: "💡 **AI Strategy (Critical Rendering Path):**\n- Trace: DOM Tree -> CSSOM Tree -> Render Tree -> Layout -> Paint.\n- Explain that CSS is render-blocking while JS is parser-blocking.\n- Explain 'defer' (executed in order after parsing) vs 'async' (executed immediately when loaded, pausing parser)."
  },
  {
    id: 5,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Frontend Developer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "What are React hooks rules, and how does React keep track of state variables behind the scenes using arrays/lists?",
    followUp: "What happens if a hook is placed inside a conditional loop?",
    hint: "💡 **AI Strategy (Hooks Execution):**\n- Highlight: Hooks must be called at the top level and only from React functional components.\n- Internally, React maintains a linked list of hook states on the fiber node.\n- Placing hooks in conditionals alters the traversal order of this list, corrupting state mapping."
  },
  {
    id: 6,
    category: 'Technical',
    difficulty: 'Easy',
    roles: ['Frontend Developer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['Fresher (0-1 yr)', 'Junior (1-3 yr)'],
    question: "Explain CSS Specificity and how cascading rules evaluate selectors like classes, IDs, and inline styles.",
    followUp: "Why is using '!important' generally considered a bad practice in CSS systems?",
    hint: "💡 **AI Strategy (CSS Specificity):**\n- Detail weight scales: Inline styles (1000), IDs (100), Classes/attributes/pseudo-classes (10), Elements/pseudo-elements (1).\n- Show how specificity is computed as a tuple (a, b, c, d)."
  },
  {
    id: 7,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Frontend Developer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "Explain the differences between REST API architecture and GraphQL.",
    followUp: "How does GraphQL solve the over-fetching and under-fetching problems?",
    hint: "💡 **AI Strategy (API Paradigms):**\n- REST: Resource-driven, multiple endpoints (GET, POST), stateless, cacheable via standard HTTP.\n- GraphQL: Schema-driven, single endpoint, client requests specific fields, avoids round-trips but shifts parsing overhead to the server."
  },
  {
    id: 8,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Frontend Developer', 'Full Stack Developer'],
    companies: ['Meta', 'Apple'],
    levels: ['All'],
    question: "What is closure in JavaScript, and how can it be used to create private variables in modules?",
    followUp: "Explain the garbage collection implications when enclosing scope variables.",
    hint: "💡 **AI Strategy (JS Closures):**\n- Define: A function's ability to remember and access its lexical scope even when executed outside that scope.\n- Private variables: Return inner functions exposing getters/setters, shielding local scope.\n- Warn about memory leaks if outer scopes retain heavy variables."
  },
  {
    id: 9,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Frontend Developer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "How does the JavaScript Event Loop coordinate execution between call stacks, microtask queues, and macrotask queues?",
    followUp: "Which queue do Promise callbacks and setTimeout callbacks go to?",
    hint: "💡 **AI Strategy (JS Event Loop):**\n- JS is single-threaded; execution stack must clear before anything runs from queues.\n- Microtasks (Promises, MutationObservers) have absolute priority and drain completely before next rendering cycle.\n- Macrotasks (setTimeout, setInterval, I/O) run one by one between render steps."
  },

  // ==================== TECHNICAL - BACKEND & SYSTEM DESIGN ====================
  {
    id: 10,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Backend Engineer', 'Full Stack Developer', 'System Design'],
    companies: ['Google', 'Amazon', 'Meta', 'Netflix'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Design a URL shortening service like Bit.ly that handles 100 million requests per day. Explain details on DB schema and caching.",
    followUp: "How do you generate unique, collision-free hashes at this scale?",
    hint: "💡 **AI Strategy (System Design - TinyURL):**\n- Core points: Base62 encoding, hash generation server (KGS) to avoid collisions.\n- Storage: NoSQL (Cassandra/MongoDB) for scale or highly optimized SQL with auto-increment IDs.\n- Cache: Redis holding top 20% most active redirect mappings.\n- Estimations: Write load vs Read load ratio."
  },
  {
    id: 11,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Backend Engineer', 'System Design'],
    companies: ['Google', 'Amazon', 'Meta'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Explain the CAP Theorem and how you would choose between consistency and availability when designing a banking system vs a social media feed.",
    followUp: "What does eventual consistency mean, and how is it implemented in modern distributed databases?",
    hint: "💡 **AI Strategy (CAP Theorem):**\n- Bankers need high Consistency (CP): rather fail transactions than show wrong balances.\n- Feeds need high Availability (AP): rather show slightly stale feed posts than block loading.\n- Detail Partition Tolerance (P) is mandatory in physical network distributed setups."
  },
  {
    id: 12,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Backend Engineer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "Explain the differences between SQL and NoSQL databases. When would you prefer one over the other?",
    followUp: "How does sharding work in database scaling, and what are partition keys?",
    hint: "💡 **AI Strategy (SQL vs NoSQL):**\n- SQL: ACID compliant, structured relationships, schema enforcement. Best for transactions.\n- NoSQL: Horizontal scaling, schema-less (JSON, key-value, column-family, graph). Best for high-write volumes, unstructured telemetry, or dynamic catalogues."
  },
  {
    id: 13,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Backend Engineer', 'System Design'],
    companies: ['Amazon', 'Flipkart'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Design a real-time notification service that sends email, SMS, and push notifications to millions of active users daily.",
    followUp: "How do you handle rate-limiting and prioritize marketing alerts vs OTP codes?",
    hint: "💡 **AI Strategy (System Design - Notifications):**\n- Architecture: Message broker (Kafka or RabbitMQ) for decoupling.\n- Priority Queues: Separate queues for critical (OTP) and non-critical (promotions).\n- Rate-limiter (Token Bucket) to avoid spamming.\n- Scalable workers calling third-party APIs (Twilio, Sendgrid) with retries & dead-letter-queues."
  },
  {
    id: 14,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Backend Engineer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "What is database normalization, and what are the rules defining 1NF, 2NF, and 3NF?",
    followUp: "When is denormalization practiced in high-read systems?",
    hint: "💡 **AI Strategy (Normalization):**\n- 1NF: Atomic values, unique row names.\n- 2NF: Meet 1NF + no partial dependency (fully dependent on primary key).\n- 3NF: Meet 2NF + no transitive dependency.\n- Denormalization is used to avoid heavy multi-table joins in high-speed read analytics."
  },
  {
    id: 15,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Backend Engineer', 'System Design'],
    companies: ['Netflix', 'Amazon'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "How do distributed locks work, and how does the Redlock algorithm in Redis ensure safety across independent nodes?",
    followUp: "What are the failure modes of distributed locks under garbage collection pauses?",
    hint: "💡 **AI Strategy (Distributed Locks):**\n- Distributed locks prevent concurrent operations in distributed servers.\n- Redlock details: Acquire lock from N independent masters with a TTL. Lock is valid if acquired from majority of nodes in time less than lease."
  },
  {
    id: 16,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Backend Engineer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "Explain the Spring Boot application lifecycle and how Dependency Injection/Inversion of Control (IoC) works.",
    followUp: "What is the difference between @Component, @Service, and @Repository annotations?",
    hint: "💡 **AI Strategy (Spring IoC):**\n- IoC container creates, configures, and manages beans.\n- DI allows loose coupling by injecting dependent beans via constructor, setter, or field.\n- Component: General stereotype bean. Service: holds business logic. Repository: handles DB integration (exposing JPA/SQL translation)."
  },
  {
    id: 17,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Backend Engineer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "What are database transactions, and how do databases implement the ACID properties?",
    followUp: "Explain the four transaction isolation levels and their dirty read vulnerabilities.",
    hint: "💡 **AI Strategy (ACID Properties):**\n- Atomicity (all or nothing), Consistency (preserves rules), Isolation (independent concurrent runs), Durability (persists in disk).\n- Isolation levels: Read Uncommitted (dirty reads), Read Committed (non-repeatable reads), Repeatable Read (phantom reads), Serializable (strict locking)."
  },
  {
    id: 18,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Backend Engineer', 'System Design'],
    companies: ['Google', 'Meta', 'Amazon'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Design an API Rate Limiter. Explain the algorithms you could use (e.g., Token Bucket, Leaky Bucket, Sliding Window Log).",
    followUp: "How do you scale this rate limiter in a multi-region distributed system?",
    hint: "💡 **AI Strategy (Rate Limiter Design):**\n- Token Bucket: Simple, handles bursts. Leaky Bucket: Fixed flow rate, smooths spikes.\n- Sliding Window: High accuracy, low memory, checks active counts within time offsets.\n- Distributed implementation: Redis cluster containing atomic increments (`INCRBY` / Lua scripts) to avoid race conditions."
  },

  // ==================== TECHNICAL - DEVOPS & CLOUD ====================
  {
    id: 19,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['DevOps Engineer', 'Backend Engineer'],
    companies: ['All'],
    levels: ['All'],
    question: "What are the primary differences between virtual machines (VMs) and Docker containers?",
    followUp: "How does the Linux kernel enable container isolation via namespaces and cgroups?",
    hint: "💡 **AI Strategy (Containers vs VMs):**\n- VMs: Hypervisor-based, run guest OS, heavy resource footprint, slow startup.\n- Containers: OS-level virtualization, share host kernel, extremely lightweight, near-instant launch.\n- Namespaces isolate processes (pid, net, mnt); cgroups restrict resources (cpu, memory, disk I/O)."
  },
  {
    id: 20,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['DevOps Engineer', 'System Design'],
    companies: ['Google', 'Amazon', 'Startup'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Explain the blue-green deployment strategy and how it differs from a canary deployment pipeline.",
    followUp: "How do you manage database schema migrations during a blue-green swap?",
    hint: "💡 **AI Strategy (Deployment Strategies):**\n- Blue-Green: Two identical production environments. Swap traffic at load-balancer level (0 downtime, fast rollback).\n- Canary: Route small % of traffic (e.g. 5%) to new version, monitor errors, then incrementally scale.\n- DB Migrations: Use 'Expand and Contract' design patterns (backward-compatible schemas)."
  },
  {
    id: 21,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['DevOps Engineer'],
    companies: ['All'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "How does Kubernetes schedule pods onto nodes, and what role do kube-scheduler, taints, and tolerations play?",
    followUp: "What is a headless service in Kubernetes and when would you use it?",
    hint: "💡 **AI Strategy (K8s Pod Scheduling):**\n- Scheduler filters nodes based on resources, then scores them to find best fit.\n- Taints are placed on nodes to repel pods; tolerations are placed on pods to allow scheduling on tainted nodes.\n- Headless service: returns pod IP addresses directly for stateful databases, skipping load balancer."
  },
  {
    id: 22,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['DevOps Engineer', 'Backend Engineer'],
    companies: ['All'],
    levels: ['All'],
    question: "What is Infrastructure as Code (IaC), and what is the difference between declarative (Terraform) and imperative (Ansible) styles?",
    followUp: "How does Terraform maintain state, and how do you prevent state locking conflicts in teams?",
    hint: "💡 **AI Strategy (IaC & Terraform):**\n- Declarative defines the *what* (desired state); imperative defines the *how* (sequential instructions).\n- Terraform maintains state in a `terraform.tfstate` file.\n- Prevent conflicts using remote backends (AWS S3) paired with lock brokers (DynamoDB)."
  },
  {
    id: 23,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['DevOps Engineer', 'Cloud Engineer'],
    companies: ['All'],
    levels: ['All'],
    question: "Detail the steps involved in a production-grade CI/CD pipeline from code commit to cloud deployment.",
    followUp: "At what stages should SAST, DAST, and integration tests run?",
    hint: "💡 **AI Strategy (CI/CD Pipeline):**\n- Commit -> Lint & Unit Test -> SAST (Static security check) -> Build Docker image -> Push to Registry -> Deploy to staging -> DAST (Dynamic pen testing) -> Promote to Production (Canary swap)."
  },

  // ==================== TECHNICAL - DATA SCIENCE & ML ====================
  {
    id: 24,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Data Scientist', 'ML Engineer'],
    companies: ['All'],
    levels: ['All'],
    question: "Explain the difference between supervised, unsupervised, and reinforcement learning.",
    followUp: "Give real-world use cases for each inside an e-commerce platform.",
    hint: "💡 **AI Strategy (ML Paradigms):**\n- Supervised: Learns from labeled dataset (e.g., price prediction, classification).\n- Unsupervised: Groups unlabeled data based on patterns (e.g. customer segmentation, clustering).\n- Reinforcement: Agent learns behavior from rewards/penalties in dynamic environments (e.g. ad placement, game AI)."
  },
  {
    id: 25,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Data Scientist', 'ML Engineer'],
    companies: ['Google', 'Meta'],
    levels: ['All'],
    question: "What is overfitting, and what regularization methods can you apply to avoid it in deep neural networks?",
    followUp: "What is the physical interpretation of L1 (Lasso) vs L2 (Ridge) regularization?",
    hint: "💡 **AI Strategy (Regularization & Overfitting):**\n- Overfitting: Model memorizes noise, failing on test sets.\n- Fixes: L1 (adds absolute weight penalty; creates sparse matrices), L2 (squared penalty; penalizes large weights), Dropout (randomly shuts down neurons during training), Early Stopping."
  },
  {
    id: 26,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Data Scientist', 'ML Engineer'],
    companies: ['All'],
    levels: ['All'],
    question: "Detail the mathematical difference between precision, recall, and the F1-score.",
    followUp: "In an AI system detecting cancer, would you optimize for high precision or high recall?",
    hint: "💡 **AI Strategy (Evaluation Metrics):**\n- Precision: True Positives / (True Positives + False Positives).\n- Recall: True Positives / (True Positives + False Negatives).\n- F1-Score: Harmonic mean of precision and recall.\n- Cancer detection: Optimize Recall (minimize False Negatives; missing a patient is fatal)."
  },
  {
    id: 27,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['ML Engineer', 'Data Scientist'],
    companies: ['Google', 'Meta', 'Apple'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Explain the structural mechanics of the Transformer architecture and how self-attention weights relationships between tokens.",
    followUp: "What are Query, Key, and Value vectors and how are they computed?",
    hint: "💡 **AI Strategy (Transformer Self-Attention):**\n- Transformers replace sequential RNNs with parallel self-attention networks.\n- Detail: For input embeddings, calculate Query (Q), Key (K), and Value (V) projections.\n- Formula: `Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V`.\n- Mention multi-head attention."
  },
  {
    id: 28,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Data Scientist', 'ML Engineer'],
    companies: ['All'],
    levels: ['All'],
    question: "What is the curse of dimensionality, and how do PCA (Principal Component Analysis) and t-SNE reduce features?",
    followUp: "Why is t-SNE generally preferred over PCA for high-dimensional visualizations?",
    hint: "💡 **AI Strategy (Dimensionality Reduction):**\n- Curse: As feature dimensions expand, data points become sparse, degrading distance metrics.\n- PCA: Linear technique; projects data along high-variance orthogonal eigenvectors.\n- t-SNE: Non-linear; preserves local neighborhood structures (probabilistic mapping)."
  },

  // ==================== TECHNICAL - MOBILE (ANDROID) ====================
  {
    id: 29,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Android Developer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "Explain the Android Activity lifecycle and how state is preserved during configuration changes like rotating the screen.",
    followUp: "What is the difference between onSaveInstanceState() and a ViewModel?",
    hint: "💡 **AI Strategy (Android Lifecycle):**\n- Stages: onCreate, onStart, onResume, onPause, onStop, onDestroy.\n- Screen rotations destroy and recreate activities.\n- ViewModels survive rotation by retaining scopes in the system memory.\n- Use `onSaveInstanceState` or `SavedStateHandle` for light serializable fields under OS process death."
  },
  {
    id: 30,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Android Developer'],
    companies: ['Google', 'Startup'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Compare the architectural paradigms of MVVM vs MVI on Android. How does Jetpack Compose change state handling?",
    followUp: "How do you handle background operations asynchronously using Kotlin Coroutines?",
    hint: "💡 **AI Strategy (Android Architectures):**\n- MVVM: Bidirectional binding or observable LiveData/Flow fields between View and ViewModel.\n- MVI: Unidirectional data flow. View emits Intents, ViewModel processes and maps to a single immutable UI State.\n- Compose leverages state hoisting and recomposition cycles."
  },

  // ==================== CODING CHALLENGES ====================
  {
    id: 31,
    category: 'Coding',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Implement the 'Two Sum' problem: Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    followUp: "How do you optimize this from an O(N^2) brute force to O(N) runtime?",
    hint: "💡 **AI Strategy (Two Sum):**\n- Use a Hash Map to store elements and their index mappings.\n- Traverse array: check if `target - current` exists in the map. If yes, return indices.\n- Runtime: O(N) space and O(N) time."
  },
  {
    id: 32,
    category: 'Coding',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Implement an algorithm to reverse a singly linked list in-place.",
    followUp: "What are the iterative and recursive space complex implications?",
    hint: "💡 **AI Strategy (Reverse Linked List):**\n- Iterative: Maintain three pointers: `prev`, `curr`, and `next`.\n- Loop: cache `next = curr.next`, point `curr.next = prev`, step `prev = curr`, `curr = next`.\n- Iterative Space: O(1). Recursive Space: O(N) call stack."
  },
  {
    id: 33,
    category: 'Coding',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    levels: ['All'],
    question: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    followUp: "How would you extend this parsing logic for nested HTML tag structures?",
    hint: "💡 **AI Strategy (Valid Parentheses):**\n- Use a Stack data structure.\n- Push closing matches onto the stack when opening brackets are encountered.\n- Pop and compare when closing characters are found. Return false on mismatch or non-empty stack."
  },
  {
    id: 34,
    category: 'Coding',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['Google', 'Meta'],
    levels: ['All'],
    question: "Find the longest substring without repeating characters in a given string.",
    followUp: "How does the sliding window technique scale here, and what is its optimal pointer lookup mapping?",
    hint: "💡 **AI Strategy (Longest Substring):**\n- Use a Sliding Window with a Hash Set or Map to record char positions.\n- Expand window right pointer. If char is active in window, contract left pointer until it becomes unique. Record max length."
  },
  {
    id: 35,
    category: 'Coding',
    difficulty: 'Hard',
    roles: ['All'],
    companies: ['Google', 'Amazon', 'Meta'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Implement a Least Recently Used (LRU) cache with O(1) time complexity for get and put operations.",
    followUp: "Why is a combination of a Doubly Linked List and a Hash Map necessary?",
    hint: "💡 **AI Strategy (LRU Cache):**\n- Doubly Linked List preserves node access orders (evict from tail, insert/promote to head).\n- Hash Map links cache keys directly to Doubly Linked List nodes for O(1) lookups."
  },
  {
    id: 36,
    category: 'Coding',
    difficulty: 'Hard',
    roles: ['All'],
    companies: ['Google', 'Meta'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Find the median of two sorted arrays of different sizes in O(log(min(m, n))) time complexity.",
    followUp: "Explain how binary search partitioning is computed on the shorter array.",
    hint: "💡 **AI Strategy (Median of Sorted Arrays):**\n- Perform Binary Search partition on the smaller array.\n- Ensure left partition holds exactly half of all elements. Verify edge values to confirm valid splits."
  },
  {
    id: 37,
    category: 'Coding',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Find the lowest common ancestor (LCA) of two nodes in a Binary Tree.",
    followUp: "Does your approach differ if the tree is a Binary Search Tree (BST)?",
    hint: "💡 **AI Strategy (LCA of Binary Tree):**\n- Traverse recursively. If root is null or matches either target, return root.\n- Find LCA in left and right subtrees. If both return non-null, current root is LCA."
  },
  {
    id: 38,
    category: 'Coding',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['Microsoft', 'Apple'],
    levels: ['All'],
    question: "Implement a function to merge overlapping intervals in an array of intervals.",
    followUp: "What is the time complexity of sorting the intervals beforehand?",
    hint: "💡 **AI Strategy (Merge Intervals):**\n- Sort intervals by start values.\n- Push first interval to output. Traverse rest: if current overlaps with previous, merge ranges; else, push."
  },
  {
    id: 39,
    category: 'Coding',
    difficulty: 'Hard',
    roles: ['All'],
    companies: ['Google', 'Meta'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Given a non-empty string and a dictionary containing a list of non-empty words, determine if the string can be segmented into a space-separated sequence of dictionary words.",
    followUp: "How do you optimize this using dynamic programming instead of recursion with memoization?",
    hint: "💡 **AI Strategy (Word Break):**\n- Initialize boolean DP array `dp[i]` tracking if substring up to index `i` is valid.\n- Loop indices: check if previous indices can segment, and if remainder is in dictionary."
  },
  {
    id: 40,
    category: 'Coding',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Given an array of integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    followUp: "How do you implement this in O(N) time and O(1) extra space using two pointers?",
    hint: "💡 **AI Strategy (Trapping Rain Water):**\n- Maintain `left` and `right` pointers with respective `leftMax` and `rightMax` heights.\n- Move the pointer containing the smaller max boundary, adding bounded heights to total water."
  },

  // ==================== BEHAVIORAL ====================
  {
    id: 41,
    category: 'Behavioral',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Describe a situation where you had a major conflict with a team member. How did you handle it?",
    followUp: "What did you learn from this, and how do you handle collaborative friction now?",
    hint: "💡 **AI Strategy (STAR Method):**\n- **Situation**: Define context.\n- **Task**: Explain the conflict (keep it objective, no complaining).\n- **Action**: Explain how you invited them to chat, actively listened, and reached a compromise.\n- **Result**: Highlight positive outcomes (on-time delivery, strengthened relationship)."
  },
  {
    id: 42,
    category: 'Behavioral',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Tell me about a time you made a major mistake or failed to meet a deadline. What did you do?",
    followUp: "How did you communicate the issue to your stakeholders?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Choose a genuine, professional mistake (avoid cliché answers like 'I worked too hard').\n- Focus on accountability: how you owned the error immediately and presented a correction plan.\n- Highlight lessons learned and actions taken to ensure it never happens again."
  },
  {
    id: 43,
    category: 'Behavioral',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Describe a project where you had to lead others or take strong ownership. What challenges did you face?",
    followUp: "How did you delegate work and ensure team alignment?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Detail your delegation strategies: matching tasks to developers' strengths.\n- Focus on scope prioritization, clear communication checkpoints, and how you supported team members under pressure."
  },
  {
    id: 44,
    category: 'Behavioral',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "How do you handle situations where requirements are extremely vague or change late in the development cycle?",
    followUp: "Can you share a specific project where scope creep occurred?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Explain your structured process for gathering requirements (asking clarifying questions, creating quick prototypes).\n- Emphasize agile principles: working in short feedback loops, establishing strong lines of communication, and managing scope."
  },
  {
    id: 45,
    category: 'Behavioral',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Tell me about a time you had to learn a complex technology quickly for a project. How did you approach it?",
    followUp: "How did you balance learning this tool while keeping up with active development tasks?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Show your systematic learning approach: parsing documentation, building a hello-world sandbox, and getting peer feedback.\n- Connect the dots to active output (e.g. built feature in 2 weeks)."
  },
  {
    id: 46,
    category: 'Behavioral',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Describe a time you proposed an innovative solution that was met with skepticism. How did you gain buy-in?",
    followUp: "What metrics did you present to back up your recommendation?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Showcase your data-driven advocacy: using benchmarks, proof-of-concept builds, or industry case studies.\n- Focus on empathy: listening to concerns and addressing risks constructively."
  },
  {
    id: 47,
    category: 'Behavioral',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Tell me about a time you went above and beyond your defined job responsibilities.",
    followUp: "Did this lead to any changes in your team's standard operating procedures?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Talk about identifying a hidden problem (e.g., redundant deployment scripts, broken test suites) and fixing it.\n- Share how it improved efficiency and helped the team scale."
  },
  {
    id: 48,
    category: 'Behavioral',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Describe a situation where you had to work closely with cross-functional teams (e.g., product, design, QA). How did you handle differences in priorities?",
    followUp: "How do you translate complex technical concepts to non-technical partners?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Highlight active collaboration: scheduling alignment syncs, creating transparent APIs, and establishing shared goals.\n- Emphasize building empathy across departments."
  },
  {
    id: 49,
    category: 'Behavioral',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "How do you handle constructive criticism or feedback that you disagree with?",
    followUp: "Can you share a specific time you received tough feedback from a lead?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Show self-awareness: actively listening, avoiding defensive responses, and asking clarifying questions.\n- Detail how you processed the feedback and adjusted your approach."
  },
  {
    id: 50,
    category: 'Behavioral',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Describe a time when your team had to work under high pressure or tight deadlines. How did you manage your workload?",
    followUp: "What boundaries did you establish to maintain balance during this push?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Talk about prioritizing tasks, calling out blockers early, and collaborating with teammates to distribute work.\n- Highlight execution under tight deadlines."
  },

  // ==================== HR & ENGINEERING CULTURE ====================
  {
    id: 51,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Why do you want to join our organization specifically, and what do you know about our engineering culture?",
    followUp: "Which of our company values resonates with you the most?",
    hint: "💡 **AI Strategy (Why Us?):**\n- Show that you did your homework: reference recent technical press releases, open-source projects, or blogs from their engineering team.\n- Connect their mission directly to your own career path."
  },
  {
    id: 52,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Where do you see yourself professionally in five years?",
    followUp: "Do you lean more towards technical leadership (Architect) or people management (Manager)?",
    hint: "💡 **AI Strategy (Five Year Plan):**\n- Focus on growth and mastery: becoming a technical subject matter expert, taking on mentorship roles, and driving architectural decisions.\n- Express a desire for long-term growth within their team."
  },
  {
    id: 53,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "What are your salary expectations for this position?",
    followUp: "Are you open to performance bonuses or equity options?",
    hint: "💡 **AI Strategy (Salary Negotiation):**\n- Highlight that you are flexible and focus first on the opportunity.\n- Provide a researched salary range based on market rates, location, and your experience level.\n- Avoid giving a single rigid number."
  },
  {
    id: 54,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Tell me about your greatest professional strength and weakness.",
    followUp: "What concrete steps are you taking to address this weakness?",
    hint: "💡 **AI Strategy (Strengths & Weaknesses):**\n- Strength: Mention a high-impact technical skill (e.g., backend systems optimization) backed by a quick real-world example.\n- Weakness: Pick a genuine area of growth (e.g., getting too bogged down in details) and explain how you manage it proactively."
  },
  {
    id: 55,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "What motivates you to work in this field, and how do you stay updated with rapidly changing tech trends?",
    followUp: "Have you contributed to any open source projects recently?",
    hint: "💡 **AI Strategy (Staying Updated):**\n- Talk about your passion for solving complex, real-world problems.\n- Reference podcasts, books, newsletters, or local tech meetups you follow."
  },
  {
    id: 56,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "How do you define a healthy and productive engineering culture?",
    followUp: "How do you contribute to psychological safety within your team?",
    hint: "💡 **AI Strategy (Engineering Culture):**\n- Emphasize key values: collaboration over competition, constructive code reviews, transparent communication, and a focus on learning from mistakes."
  },
  {
    id: 57,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Do you have any questions for me as the interviewer?",
    followUp: null,
    hint: "💡 **AI Strategy (Questions to Ask):**\n- Ask smart, thoughtful questions: 'What does success look like in this role?', 'What is the biggest technical challenge your team is tackling right now?', or 'How does the team handle post-mortems?'"
  },
  {
    id: 58,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "How do you handle tight deadlines or stressful situations in the workplace?",
    followUp: "What are your strategies for maintaining a healthy work-life balance?",
    hint: "💡 **AI Strategy (Stress Management):**\n- Talk about staying organized, prioritizing tasks, communicating early with leads when blockers arise, and taking breaks to recharge."
  },
  {
    id: 59,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "What would your previous manager or colleagues say is your most valuable trait?",
    followUp: "What is one area they would say you could improve in?",
    hint: "💡 **AI Strategy (Colleague Feedback):**\n- Focus on positive team traits: reliability, strong problem-solving skills, willingness to mentor, or great communication under pressure."
  },
  {
    id: 60,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Why are you looking to leave your current role, and what are you looking for in your next opportunity?",
    followUp: "How would you handle a counter-offer from your current employer?",
    hint: "💡 **AI Strategy (Leaving Current Role):**\n- Keep it positive: focus on seeking new challenges, growing your skills, and taking on more technical scope. Avoid bad-mouthing past employers."
  },

  // ==================== APTITUDE & PUZZLES ====================
  {
    id: 61,
    category: 'Aptitude',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "A train travels 240km in 3 hours. Another train covers the same distance in 4 hours. At what point do they meet if they start simultaneously from opposite ends?",
    followUp: "What is their relative speed?",
    hint: "💡 **AI Strategy (Relative Speed):**\n- Speed of train 1 = 240 / 3 = 80 km/h.\n- Speed of train 2 = 240 / 4 = 60 km/h.\n- Combined relative speed = 80 + 60 = 140 km/h.\n- Time to meet = Total distance / Relative speed = 240 / 140 = 1.71 hours (approx. 1 hour and 43 minutes)."
  },
  {
    id: 62,
    category: 'Aptitude',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['Google', 'Meta'],
    levels: ['All'],
    question: "You have 8 identical-looking balls, but one is slightly heavier than the others. How can you find the heavier ball in exactly 2 weighings using a balance scale?",
    followUp: "What if you had 9 balls?",
    hint: "💡 **AI Strategy (Scale Puzzles):**\n- Group the balls into three sets: 3, 3, and 2.\n- Weighing 1: Weigh the two groups of 3 against each other.\n- If balanced, the heavier ball is in the group of 2 (weigh them to find it).\n- If unbalanced, weigh any 2 balls from the heavier group of 3 against each other to find it."
  },
  {
    id: 63,
    category: 'Aptitude',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "The probability of it raining in a 1-hour window is 75%. What is the probability of it raining at least once during a 3-hour period?",
    followUp: "What if the probabilities in each hour were independent?",
    hint: "💡 **AI Strategy (Probability Math):**\n- Calculate the probability of the complementary event (no rain at all).\n- Probability of no rain in 1 hour = 100% - 75% = 25% (or 0.25).\n- Probability of no rain in 3 consecutive hours = 0.25 * 0.25 * 0.25 = 0.0156 (or 1.56%).\n- Probability of at least one rain event = 1 - 0.0156 = 98.44%."
  },
  {
    id: 64,
    category: 'Aptitude',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "A merchant buys a product for ₹80, sells it for ₹100, buys it back for ₹110, and sells it again for ₹130. How much total profit did they make?",
    followUp: "What is their total profit margin?",
    hint: "💡 **AI Strategy (Math Profit Puzzles):**\n- Treat the transactions as two separate events.\n- Transaction 1: profit = ₹100 - ₹80 = ₹20.\n- Transaction 2: profit = ₹130 - ₹110 = ₹20.\n- Total profit = ₹20 + ₹20 = ₹40."
  },
  {
    id: 65,
    category: 'Aptitude',
    difficulty: 'Hard',
    roles: ['All'],
    companies: ['Google', 'Microsoft'],
    levels: ['All'],
    question: "You have two hourglasses: one measures exactly 4 minutes, and the other measures exactly 7 minutes. How can you measure exactly 9 minutes using only these two hourglasses?",
    followUp: "Is there more than one way to solve this?",
    hint: "💡 **AI Strategy (Hourglass Puzzles):**\n- Start both hourglasses. When the 4-min one runs out, 3 mins remain in the 7-min one.\n- Flip the 4-min one immediately (time elapsed = 4 mins).\n- When the 7-min one runs out (7 mins total elapsed), flip the 7-min one immediately. The 4-min one now has exactly 1 min left.\n- When the 4-min one runs out (8 mins elapsed), the 7-min one has run for exactly 1 min. Flip the 7-min one back to measure 1 more min, reaching 9 mins total."
  },
  {
    id: 66,
    category: 'Aptitude',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Complete the sequence: 2, 6, 12, 20, 30, ... What is the next number and what is the underlying logic?",
    followUp: "What would the 10th term in this sequence be?",
    hint: "💡 **AI Strategy (Sequence Patterns):**\n- Look at the differences between consecutive terms: 4, 6, 8, 10.\n- The next difference must be 12.\n- Next number = 30 + 12 = 42.\n- Alternatively, the formula is `n^2 + n` for n = 1, 2, 3, 4, 5."
  },
  {
    id: 67,
    category: 'Aptitude',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "In a class of 60 students, 40 play football, 30 play cricket, and 18 play both. How many students do not play either sport?",
    followUp: "How many students play football but not cricket?",
    hint: "💡 **AI Strategy (Venn Diagrams):**\n- Total students (N) = 60.\n- Football (F) = 40, Cricket (C) = 30, Both (F ∩ C) = 18.\n- Total playing at least one sport = F + C - (F ∩ C) = 40 + 30 - 18 = 52.\n- Students playing neither sport = 60 - 52 = 8."
  },
  {
    id: 68,
    category: 'Aptitude',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "A tank can be filled by Pipe A in 6 hours and emptied by Pipe B in 8 hours. If both pipes are opened simultaneously, how long will it take to fill the empty tank?",
    followUp: "What if there was a third pipe that filled it in 12 hours?",
    hint: "💡 **AI Strategy (Work and Time):**\n- Pipe A rate = 1/6 of the tank per hour.\n- Pipe B rate = -1/8 of the tank per hour.\n- Net rate = 1/6 - 1/8 = (4 - 3) / 24 = 1/24 of the tank per hour.\n- Time to fill = 1 / (1/24) = 24 hours."
  },
  {
    id: 69,
    category: 'Aptitude',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "What is the angle between the hour hand and the minute hand of a clock at exactly 3:15?",
    followUp: "What about at 3:30?",
    hint: "💡 **AI Strategy (Clock Angles):**\n- A clock has 360 degrees, with each minute representing 6 degrees.\n- At 3:15, the minute hand is exactly on the 3 (90 degrees).\n- In 15 minutes, the hour hand moves: 15 mins * 0.5 degrees/min = 7.5 degrees.\n- Since the hour hand started at 90 degrees, the angle between the hands is exactly 7.5 degrees."
  },
  {
    id: 70,
    category: 'Aptitude',
    difficulty: 'Hard',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "A box contains 5 red, 4 blue, and 3 green balls. If 3 balls are drawn at random, what is the probability that all 3 are of different colors?",
    followUp: "What is the probability that at least 2 are of the same color?",
    hint: "💡 **AI Strategy (Combinations & Probability):**\n- Total balls = 5 + 4 + 3 = 12. Total ways to draw 3 balls = 12C3 = (12 * 11 * 10) / (3 * 2 * 1) = 220.\n- Ways to draw 1 ball of each color = 5C1 * 4C1 * 3C1 = 5 * 4 * 3 = 60.\n- Probability = 60 / 220 = 3 / 11 = 27.27%."
  },

  // ==================== MORE DIVERSE TECHNICAL QUESTIONS ====================
  {
    id: 71,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Backend Engineer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "What are Java Streams, and how do intermediate operations differ from terminal operations in functional pipelines?",
    followUp: "Why are streams lazy, and what are the performance benefits of short-circuiting operations like findFirst()?",
    hint: "💡 **AI Strategy (Java Streams):**\n- Streams represent a sequence of elements supporting sequential and parallel aggregate operations.\n- Intermediate: returns a new stream (e.g. filter, map, sorted). Lazy evaluation.\n- Terminal: executes pipeline and returns result (e.g. collect, forEach, reduce)."
  },
  {
    id: 72,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Backend Engineer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "What is multi-threading, and how does the synchronized keyword prevent race conditions in Java?",
    followUp: "What is a deadlock, and what are the four conditions required for a deadlock to occur?",
    hint: "💡 **AI Strategy (Multi-Threading):**\n- Multi-threading: running multiple threads concurrently to optimize CPU usage.\n- `synchronized` locks objects/classes to ensure only one thread executes a critical section at a time.\n- Deadlock conditions: Mutual exclusion, Hold and wait, No preemption, Circular wait."
  },
  {
    id: 73,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Backend Engineer', 'System Design'],
    companies: ['Google', 'Meta'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Design a high-throughput Chat Application like WhatsApp. How do you design for delivery guarantees and offline message queuing?",
    followUp: "How do you handle group chats with thousands of active users?",
    hint: "💡 **AI Strategy (System Design - WhatsApp):**\n- Protocol: WebSockets or XMPP for persistent duplex connection.\n- Storage: NoSQL Key-value or Column-family (HBase/Cassandra) for fast message writes.\n- Flow: Sender -> Gateway -> Queue (Kafka) -> Receiver. If offline, cache in DB and deliver upon connection. Use sequence IDs."
  },
  {
    id: 74,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Frontend Developer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "What is Redux/Zustand state management, and when would you use a global state manager over local component state?",
    followUp: "Explain the flux pattern: Actions, Reducers, and Store.",
    hint: "💡 **AI Strategy (Global State):**\n- Use global state when data is accessed by deeply nested, unrelated components (e.g., user auth, themes, cart items).\n- Local state is preferred for UI toggles, active inputs, and isolated page elements.\n- Flux details: Unidirectional data flow. Component dispatches Action -> Store processes -> View updates."
  },
  {
    id: 75,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Frontend Developer', 'Full Stack Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "What are CSS Flexbox and Grid? Explain when to use one layout over the other.",
    followUp: "How does 'grid-template-areas' simplify complex dashboard layouts?",
    hint: "💡 **AI Strategy (CSS Flexbox vs Grid):**\n- Flexbox: 1-Dimensional layout (row OR column). Best for aligned menus, lists, or simple wraps.\n- Grid: 2-Dimensional layout (rows AND columns). Best for page structures, image galleries, and multi-widget dashboards."
  },
  {
    id: 76,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Backend Engineer', 'DevOps Engineer', 'System Design'],
    companies: ['Amazon', 'Microsoft'],
    levels: ['All'],
    question: "What is OAuth 2.0, and how does the Authorization Code flow with PKCE protect mobile and single-page apps?",
    followUp: "What is the difference between an ID Token, an Access Token, and a Refresh Token?",
    hint: "💡 **AI Strategy (OAuth 2.0 & Security):**\n- OAuth is an authorization framework allowing third-party apps to access API resources.\n- PKCE (Proof Key for Code Exchange) prevents authorization code interception on public clients using dynamically generated cryptographic verifiers."
  },
  {
    id: 77,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Data Scientist', 'ML Engineer'],
    companies: ['All'],
    levels: ['All'],
    question: "What is SQL Query Optimization? How do index scans, index seeks, and composite indexes speed up queries?",
    followUp: "Why does using 'SELECT *' degrade database performance?",
    hint: "💡 **AI Strategy (Query Optimization):**\n- Index Seek: Direct B-Tree traversal to specific records (very fast).\n- Index Scan: Traverses the entire index structure (slower).\n- Composite Index: Index on multiple columns; left-prefix rule applies.\n- SELECT * reads unnecessary columns, increases network latency, and prevents index-only scans."
  },
  {
    id: 78,
    category: 'Technical',
    difficulty: 'Hard',
    roles: ['Backend Engineer', 'System Design'],
    companies: ['Netflix', 'Google'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Design a Video Streaming Platform like Netflix. Explain the ingestion, encoding, storage, and Content Delivery Network (CDN) layers.",
    followUp: "How do you handle adaptive bitrate streaming under unstable network speeds?",
    hint: "💡 **AI Strategy (System Design - Netflix):**\n- Ingestion: Upload raw file -> chunks.\n- Encoding: Transcode to multiple formats/resolutions (H.264, VP9).\n- CDN: Cache encoded chunks globally on Edge servers (Netflix Open Connect).\n- Adaptive streaming: HLS / DASH protocols swap chunk qualities dynamically based on network telemetry."
  },
  {
    id: 79,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Android Developer'],
    companies: ['All'],
    levels: ['All'],
    question: "What is a Content Provider in Android, and how do you share data securely between different applications?",
    followUp: "What is the role of ContentURIs and UriMatcher?",
    hint: "💡 **AI Strategy (Content Providers):**\n- Content Providers manage access to structured data repositories.\n- Encapsulate data and provide security using standard CRUD query endpoints.\n- Expose standard URIs parsed by `UriMatcher` to resolve queries."
  },
  {
    id: 80,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['DevOps Engineer', 'Cloud Engineer'],
    companies: ['All'],
    levels: ['All'],
    question: "What is AWS IAM (Identity and Access Management)? Explain the principle of least privilege.",
    followUp: "What is the difference between an IAM User, a Group, a Policy, and a Role?",
    hint: "💡 **AI Strategy (AWS IAM):**\n- IAM manages access permissions for AWS resources.\n- Least Privilege: Users/services get only the minimum permissions required for their tasks.\n- Policies define permissions (JSON documents).\n- Roles are assumed temporarily by services or external users (no persistent credentials)."
  },

  // ==================== MORE BEHAVIORAL QUESTIONS ====================
  {
    id: 81,
    category: 'Behavioral',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Describe a time you had to pivot quickly in response to a sudden, external market change or business priority.",
    followUp: "How did this pivot impact your active sprints?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Describe the external trigger (e.g., product direction change, competitor release).\n- Focus on adaptibility: reassessing priorities, communicating changes to the team, and restructuring work goals."
  },
  {
    id: 82,
    category: 'Behavioral',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Tell me about a time you mentored a junior engineer or a peer who was struggling. How did you help them succeed?",
    followUp: "What did you learn about your own communication style?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Show empathy: identifying their specific blockers (technical or confidence).\n- Describe concrete steps: pair programming, sharing structured learning resources, or setting up weekly syncs."
  },
  {
    id: 83,
    category: 'Behavioral',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['Mid-level (3-5 yr)', 'Senior (5+ yr)'],
    question: "Describe a time you had to deliver a difficult or highly technical project with very limited resources or a lean team.",
    followUp: "How did you manage technical debt to meet the deadline?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Emphasize scoping down to a Minimum Viable Product (MVP).\n- Focus on automating repetitive tasks, pair programming on critical paths, and maintaining clear communication with stakeholders."
  },
  {
    id: 84,
    category: 'Behavioral',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Tell me about a time you noticed an inefficiency in your team's workflow and took the initiative to fix it.",
    followUp: "What was the measurable impact of this improvement?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Pick a relatable inefficiency (e.g., slow builds, manual deployments, or poor documentation).\n- Focus on your proactive solution: building a helper script, setting up CI templates, or writing standard operating procedures."
  },
  {
    id: 85,
    category: 'Behavioral',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Describe a situation where you had to work with someone whose working style was completely opposite to yours.",
    followUp: "How did you build a productive working relationship?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Highlight professional respect and open communication.\n- Explain how you aligned on expectations and documented decisions to avoid misunderstandings."
  },
  {
    id: 86,
    category: 'Behavioral',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Tell me about a time when you received highly critical feedback on your work from a peer or stakeholder.",
    followUp: "How did you implement that feedback in your subsequent work?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Choose a constructive example (e.g., feedback on architectural design or code readability).\n- Focus on objective listening: thanking them for the input, validating their concerns, and adjusting your approach."
  },
  {
    id: 87,
    category: 'Behavioral',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Describe a time you had to make an important technical decision under pressure with incomplete data.",
    followUp: "What fallback plans did you establish in case your decision proved incorrect?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Focus on risk assessment: identifying the worst-case scenarios and listing known vs. unknown risks.\n- Explain how you chose the path of highest reversibility."
  },
  {
    id: 88,
    category: 'Behavioral',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Tell me about a time you had to convince a product manager to prioritize addressing technical debt over building new features.",
    followUp: "How did you translate technical debt into business metrics?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Show communication skills: linking technical debt directly to business outcomes (e.g., slower release cycles, higher infrastructure costs, or poor user experience)."
  },
  {
    id: 89,
    category: 'Behavioral',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Describe a project that you worked on that failed or was cancelled. How did you handle the situation?",
    followUp: "What post-mortem lessons did you carry over to your next project?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Focus on resilience and professional growth.\n- Emphasize what you learned from the failure and how you kept the team motivated."
  },
  {
    id: 90,
    category: 'Behavioral',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "Describe a time when you had to balance multiple high-priority tasks simultaneously. How did you manage your time and stakeholders' expectations?",
    followUp: "How did you communicate when a deadline was no longer realistic?",
    hint: "💡 **AI Strategy (STAR Method):**\n- Detail your prioritization framework (e.g., Eisenhower Matrix, impact vs. effort).\n- Focus on setting expectations early, communicating transparently, and managing your time effectively."
  },

  // ==================== MORE HR & PUZZLES ====================
  {
    id: 91,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "What are your professional goals for the next 1-2 years, and how does this role align with them?",
    followUp: "What specific skills or technologies are you looking to master next?",
    hint: "💡 **AI Strategy (Near-term Goals):**\n- Express a desire for impact: mastering their tech stack, contributing to core services, and taking on more ownership.\n- Connect your goals to their team's active roadmap."
  },
  {
    id: 92,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "How do you handle disagreement with a technical decision made by your leadership team?",
    followUp: "Explain the concept of 'Disagree and Commit'.",
    hint: "💡 **AI Strategy (Disagree and Commit):**\n- Express a professional approach: sharing your data-backed concerns constructively during the planning phase.\n- Emphasize that once a decision is finalized, you fully commit to executing it successfully."
  },
  {
    id: 93,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "What does working in a collaborative team mean to you, and how do you support a diverse working environment?",
    followUp: "Can you share an experience working with a distributed or international team?",
    hint: "💡 **AI Strategy (Teamwork & Diversity):**\n- Focus on key values: active listening, inclusion, clear documentation, psychological safety, and mutual support."
  },
  {
    id: 94,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "What is your approach to maintaining continuous learning in your career?",
    followUp: "Which tech blogs, newsletters, or authors do you read regularly?",
    hint: "💡 **AI Strategy (Continuous Learning):**\n- Mention active habits: reading engineering blogs (e.g., Netflix, Uber), experimenting with new frameworks in sandboxes, and learning from peers."
  },
  {
    id: 95,
    category: 'HR',
    difficulty: 'Easy',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "What kind of work environment or management style helps you perform at your best?",
    followUp: "How do you handle micromanagement if you encounter it?",
    hint: "💡 **AI Strategy (Work Environment):**\n- Focus on positive conditions: clear goals, open communication, autonomy, and constructive feedback loops. Avoid bad-mouthing past managers."
  },
  {
    id: 96,
    category: 'Aptitude',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "If a bottle and a cork cost ₹110 in total, and the bottle costs ₹100 more than the cork, how much does the cork cost?",
    followUp: "Explain the algebraic formulation.",
    hint: "💡 **AI Strategy (Algebra Puzzles):**\n- Let the cork cost C, and the bottle cost B.\n- We have: `B + C = 110` and `B = C + 100`.\n- Substituting B gives: `(C + 100) + C = 110` -> `2C + 100 = 110` -> `2C = 10` -> `C = 5`.\n- Therefore, the cork costs ₹5 and the bottle costs ₹105."
  },
  {
    id: 97,
    category: 'Aptitude',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "You have a 3-gallon jug and a 5-gallon jug. How can you measure exactly 4 gallons of water, assuming you have an unlimited water supply?",
    followUp: "Can you solve this starting with either jug?",
    hint: "💡 **AI Strategy (Water Jug Puzzles):**\n- Fill the 5-gallon jug completely. Pour it into the 3-gallon jug, leaving 2 gallons in the 5-gallon jug.\n- Empty the 3-gallon jug. Pour the 2 gallons from the 5-gallon jug into the 3-gallon jug (1 gallon of space remains).\n- Fill the 5-gallon jug again. Pour water into the 3-gallon jug until it is full (exactly 1 gallon is transferred).\n- The 5-gallon jug now contains exactly 4 gallons."
  },
  {
    id: 98,
    category: 'Aptitude',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "A clock loses 10 minutes every 24 hours. If it is set correctly at 8:00 AM on Monday, what time will it show at 8:00 PM on Wednesday?",
    followUp: "What is the rate of time loss per hour?",
    hint: "💡 **AI Strategy (Clock Loss Calculations):**\n- Total hours from Monday 8:00 AM to Wednesday 8:00 PM = 60 hours.\n- Rate of time loss = 10 minutes per 24 hours = 5/12 minutes per hour.\n- Total time lost = 60 hours * (5/12) minutes/hour = 25 minutes.\n- Time shown = 8:00 PM - 25 minutes = 7:35 PM on Wednesday."
  },
  {
    id: 99,
    category: 'Aptitude',
    difficulty: 'Hard',
    roles: ['All'],
    companies: ['Google', 'Meta'],
    levels: ['All'],
    question: "You are in a room with three light switches. Outside the room, there are three identical light bulbs, all currently off. You can only enter the bulb room once. How do you determine which switch controls which bulb?",
    followUp: "What assumptions are you making about the hardware?",
    hint: "💡 **AI Strategy (Bulb Puzzles):**\n- Turn Switch 1 on and leave it on for 5 minutes (letting the bulb heat up).\n- Turn Switch 1 off, and turn Switch 2 on.\n- Enter the bulb room immediately:\n  - The bulb that is ON is controlled by Switch 2.\n  - The bulb that is OFF but WARM is controlled by Switch 1.\n  - The bulb that is OFF and COLD is controlled by Switch 3."
  },
  {
    id: 100,
    category: 'Aptitude',
    difficulty: 'Medium',
    roles: ['All'],
    companies: ['All'],
    levels: ['All'],
    question: "A group of 5 people need to cross a bridge at night. They have only one flashlight, and the bridge can hold at most 2 people at a time. The crossing times for each person are 1, 3, 5, 8, and 12 minutes. When two people cross, they must walk at the slower person's pace. What is the minimum time required for all of them to cross?",
    followUp: "What is the general strategy for returning the flashlight?",
    hint: "💡 **AI Strategy (Bridge Crossing Puzzles):**\n- Send the fastest crossers (1 and 3) first (time = 3 mins). Return 1 with the flashlight (time = 1 min, total = 4 mins).\n- Send the slowest crossers (8 and 12) next (time = 12 mins, total = 16 mins). Return 3 with the flashlight (time = 3 mins, total = 19 mins).\n- Send 1 and 5 next (time = 5 mins, total = 24 mins). Return 1 with the flashlight (time = 1 min, total = 25 mins).\n- Finally, send 1 and 3 to cross (time = 3 mins).\n- Total minimum time = 28 minutes."
  },
  {
    id: 101,
    category: 'Technical',
    difficulty: 'Medium',
    roles: ['Backend Engineer', 'Full Stack Developer', 'System Design'],
    companies: ['All'],
    levels: ['All'],
    question: "What is the difference between monolithic architecture and microservices architecture?",
    followUp: "How do you handle inter-service communication in a microservices system?",
    hint: "💡 **AI Strategy (Microservices vs Monolith):**\n- Monolith: Single codebase, single deployment unit. Easy to develop initially, but scales poorly.\n- Microservices: Decentralized, autonomous services. Scales independently, but introduces complexity.\n- Communication: Synchronous (REST, gRPC) or Asynchronous (message brokers like Kafka or RabbitMQ)."
  }
]
