# Java Code Guidelines

Guidelines specific to Java development. See [Code Guidelines](../README.md) for general standards.

**[← Back to Index](../INDEX.md)**

---

## Naming & Conventions

- **Variables & Methods**: camelCase
- **Classes & Interfaces**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Packages**: lowercase (com.company.project)

---

## Access Modifiers

- **Default**: private for class members
- **Explicit**: Always use explicit access modifiers
- **Never**: Rely on package-private visibility

**Good (✓)**:
```java
public class UserService
{
    private String email;
    private int age;
    
    public String getEmail()
    {
        return this.email;
    }
    
    public void setEmail(String email)
    {
        this.email = email;
    }
}
```

---

## Brackets & Formatting

- **Style**: Allman style (opening bracket on new line)
- **Line Length**: 110 characters maximum
- **Indentation**: 4 spaces (or 1 tab)

---

## Comments & Documentation

- **Javadoc**: Required for public classes, methods, and fields
- **Format**: Use @param, @return, @throws tags

**Good (✓)**:
```java
/**
 * Processes a user by their ID.
 *
 * @param userId the unique identifier for the user
 * @param verbose enable verbose logging
 * @return a map containing processed user data
 * @throws UserNotFoundException if user does not exist
 */
public Map<String, Object> processUser(String userId, boolean verbose)
{
    // implementation
}
```

---

## Exceptions

- **Create**: Custom exceptions for domain-specific errors
- **Throw**: Checked exceptions at API boundaries
- **Catch**: Specific exception types, not Exception

**Good (✓)**:
```java
try
{
    User user = getUserById(userId);
}
catch (UserNotFoundException e)
{
    logger.error("User not found: " + userId, e);
    throw e;
}
catch (DatabaseException e)
{
    logger.error("Database error while fetching user", e);
    throw new RuntimeException("Failed to fetch user", e);
}
```

**Avoid (❌)**:
```java
try
{
    User user = getUserById(userId);
}
catch (Exception e)  // Too broad!
{
    e.printStackTrace();
}
```

---

## Getters and Setters

- **Required**: All public and private variables must have getter and setter methods
- **Naming**: `GetVariableName()` and `SetVariableName(value)`
- **Validation**: Include validation logic in setters when appropriate

**Good (✓)**:
```java
public class User
{
    private String email;
    private int age;
    
    public String GetEmail()
    {
        return this.email;
    }
    
    public void SetEmail(String email)
    {
        if (isValidEmail(email))
        {
            this.email = email;
        }
    }
    
    public int GetAge()
    {
        return this.age;
    }
    
    public void SetAge(int age)
    {
        if (age > 0 && age < 150)
        {
            this.age = age;
        }
    }
}
```

---

## Early Terminations

- **Prefer**: Guard clauses and early returns
- **Rationale**: Reduces nesting and improves readability

**Avoid (❌)**:
```java
public boolean validate(User user)
{
    if (user.isActive())
    {
        if (user.isVerified())
        {
            if (user.hasPermission())
            {
                return true;
            }
        }
    }
    return false;
}
```

**Preferred (✓)**:
```java
public boolean validate(User user)
{
    if (!user.isActive()) return false;
    if (!user.isVerified()) return false;
    if (!user.hasPermission()) return false;
    return true;
}
```

---

## Streams and Functional Programming

- **Use**: Java Streams for collections processing
- **Avoid**: Nested loops when Streams can simplify

**Good (✓)**:
```java
List<String> activeEmails = users.stream()
    .filter(User::isActive)
    .map(User::getEmail)
    .collect(Collectors.toList());
```

---

## Pre-Approval Checklist (Java)

Use this checklist for Java code reviews:

- [ ] All classes have explicit access modifiers
- [ ] Public classes/methods have Javadoc
- [ ] Allman style brackets applied
- [ ] Line length ≤ 110 characters
- [ ] camelCase for variables/methods, PascalCase for classes
- [ ] All variables have GetVariable() and SetVariable() methods
- [ ] Specific exceptions caught, not generic Exception
- [ ] Guard clauses used for early returns
- [ ] Constants named in UPPER_SNAKE_CASE
- [ ] Streams used appropriately for collections
- [ ] No null pointer exceptions without validation

---

## Related Documentation

- [Main Code Guidelines](../README.md)
- [TypeScript/JavaScript Guidelines](TYPESCRIPT.md)
- [Python Guidelines](PYTHON.md)
- [Go Guidelines](GO.md)
- [C#/.NET Guidelines](CSHARP.md)
