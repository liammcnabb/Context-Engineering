# C++ and Qt Code Guidelines

Guidelines specific to C++ and Qt development. See [Code Guidelines](../README.md) for general standards.

**[← Back to Index](../INDEX.md)**

---

## Naming & Conventions

- **Variables & Methods**: camelCase
- **Classes & Interfaces**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Private Members**: Prefix with `m_` (e.g., `m_userData`)
- **Qt Signals/Slots**: Use Qt naming conventions

---

## Headers & Organization

- **Include Guards**: Use `#pragma once` for modern C++
- **Order**: System headers, third-party, project headers
- **Separation**: .h for declarations, .cpp for implementation

**Good (✓)**:
```cpp
#pragma once

#include <QString>
#include <QObject>

#include "DataModel.h"
#include "Logger.h"

class UserService : public QObject
{
    Q_OBJECT
    
public:
    explicit UserService(QObject *parent = nullptr);
    QString getUserName(const QString &userId);

signals:
    void userProcessed(const QString &userId);

private slots:
    void onDataReceived(const QJsonObject &data);

private:
    QString m_apiEndpoint;
    DataModel *m_dataModel;
};
```

---

## Namespace Usage

- **Avoid**: Do NOT use `using namespace`
- **Use**: Fully qualified names or namespace aliases for clarity
- **Rationale**: Prevents naming conflicts and makes code intent explicit

**Good (✓)**:
```cpp
#include <QString>
#include <QObject>
#include <vector>

// Use fully qualified names
class UserService : public QObject
{
    Q_OBJECT
    
public:
    std::vector<QString> getUserList();
};

// Or use namespace aliases for long names
namespace fs = std::filesystem;
fs::path configFile = fs::current_path() / "config.json";
```

**Avoid (❌)**:
```cpp
using namespace std;
using namespace Qt;

// Now it's unclear where functions come from
vector<QString> users = getUsers();
```

---

## Memory Management

- **Smart Pointers**: Use `std::unique_ptr` and `std::shared_ptr`
- **Qt Objects**: Use parent-child hierarchy for automatic cleanup
- **Avoid**: Raw `new`/`delete` without ownership semantics

**Good (✓)**:
```cpp
class MainWindow : public QMainWindow
{
    Q_OBJECT
    
public:
    MainWindow(QWidget *parent = nullptr);

private:
    std::unique_ptr<UserService> m_userService;
    QLabel *m_statusLabel;  // Owned by this widget
};
```

**Avoid (❌)**:
```cpp
UserService *service = new UserService();  // Memory leak prone
```

---

## Qt Signals & Slots

- **Declarations**: Use `signals:`, `slots:`, and `Q_OBJECT` macro
- **Connections**: Use `connect()` with proper signatures
- **Emit**: Only emit from class that defines signal

**Good (✓)**:
```cpp
class DataProcessor : public QObject
{
    Q_OBJECT
    
public:
    explicit DataProcessor(QObject *parent = nullptr);
    void processData(const QString &input);

signals:
    void dataProcessed(const QString &result);
    void errorOccurred(const QString &message);

private slots:
    void onProcessingFinished();
};

// Connection example
DataProcessor processor;
connect(&processor, &DataProcessor::dataProcessed, 
        this, &MainWindow::onDataReady);
```

---

## Brackets & Formatting

- **Style**: Allman style (opening bracket on new line)
- **Line Length**: 110 characters maximum
- **Indentation**: 4 spaces
- **Qt Style**: Follow Qt Creator formatting

---

## Functions & Methods

- **Length**: Keep under 80 lines
- **Parameters**: Use const references for large objects
- **Return**: Use standard types for easy interfacing

**Good (✓)**:
```cpp
bool processUserData(const QJsonObject &data, QString &errorMsg)
{
    if (data.isEmpty())
    {
        errorMsg = "Data is empty";
        return false;
    }
    
    QString userId = data.value("id").toString();
    if (userId.isEmpty())
    {
        errorMsg = "Missing user ID";
        return false;
    }
    
    // Process data
    return true;
}
```

---

## Qt String Handling

- **Use**: `QString` for text manipulation
- **Literals**: Use `QStringLiteral()` for compile-time strings
- **Conversions**: Use `.toStdString()` and `QString::fromStdString()` carefully

**Good (✓)**:
```cpp
QString name = QStringLiteral("John Doe");
QString queryResult = database.query(QStringLiteral("SELECT * FROM users"));

for (const QString &user : userList)
{
    qDebug() << user;
}
```

---

## Error Handling

- **Exceptions**: Use sparingly in Qt code (Qt uses error codes)
- **Logging**: Use `qDebug()`, `qWarning()`, `qCritical()`
- **Returns**: Use bool or error codes for status

**Good (✓)**:
```cpp
bool UserService::loadData(const QString &filePath)
{
    QFile file(filePath);
    if (!file.open(QIODevice::ReadOnly))
    {
        qWarning() << "Failed to open file:" << filePath;
        emit errorOccurred("Cannot open file");
        return false;
    }
    
    // Load and process
    return true;
}
```

---

## Qt Model/View

- **Models**: Inherit from `QAbstractItemModel` or `QAbstractTableModel`
- **Index**: Always validate model indices
- **Roles**: Define custom roles for data access

**Good (✓)**:
```cpp
class UserModel : public QAbstractTableModel
{
    Q_OBJECT
    
public:
    explicit UserModel(QObject *parent = nullptr);
    
    int rowCount(const QModelIndex &parent = QModelIndex()) const override;
    int columnCount(const QModelIndex &parent = QModelIndex()) const override;
    QVariant data(const QModelIndex &index, int role) const override;
    
private:
    QList<User> m_users;
};
```

---

## Threading

- **QThread**: Use for long-running operations
- **Connections**: Use `Qt::ConnectionType` for thread safety
- **Signals/Slots**: Thread-safe by default with proper connection type

**Good (✓)**:
```cpp
class DataFetcher : public QObject
{
    Q_OBJECT
    
public slots:
    void fetchData()
    {
        // Thread-safe data fetching
    }

signals:
    void dataReady(const QJsonArray &data);
};

// Usage
QThread workerThread;
DataFetcher fetcher;
fetcher.moveToThread(&workerThread);
connect(&workerThread, &QThread::started, &fetcher, &DataFetcher::fetchData);
```

---

## Pre-Approval Checklist (C++/Qt)

Before approving C++ or Qt code, verify:

- [ ] NO `using namespace` statements
- [ ] All names fully qualified or aliased
- [ ] No raw `new`/`delete` without ownership documentation
- [ ] Smart pointers used (`unique_ptr`, `shared_ptr`)
- [ ] Qt objects use parent-child hierarchy
- [ ] All signals/slots properly connected
- [ ] `const` qualifiers used for read-only parameters
- [ ] References used for large objects instead of copies
- [ ] Error handling present (qWarning, error returns)
- [ ] No lines exceed 110 characters
- [ ] Allman style brackets applied
- [ ] Method length ≤ 80 lines
- [ ] Private members prefixed with `m_`
- [ ] Qt string handling (`QString`, `QStringLiteral`)
- [ ] Model indices always validated
- [ ] Thread safety considerations for signals/slots
- [ ] Memory management reviewed (no leaks)
- [ ] `#pragma once` used in headers

---

## Additional Resources

- [Qt Documentation](https://doc.qt.io/)
- [C++ Core Guidelines](https://github.com/isocpp/CppCoreGuidelines)
- [Qt Coding Style](https://wiki.qt.io/Qt_Coding_Style)

