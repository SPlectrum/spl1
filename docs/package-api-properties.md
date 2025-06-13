[← Home](../README.md)

# SPL Package API Properties

## Package Structure
```javascript
{
  headers: { 
    spl: { 
      package: { 
        name: "package-name"  // Only property currently used
      } 
    } 
  },
  value: {
    "file.txt": "content",
    "dir/": {},              // Directory marker
    "dir/nested.js": "code"
  }
}
```

## Properties
| Property | Type | Purpose | Set By |
|----------|------|---------|--------|
| `name` | String | Package identifier (filename without extension) | `spl/package/create` |

## Usage in API Methods
| Method | Headers Usage |
|--------|---------------|
| **create** | Sets `headers.spl.package.name` from filename |
| **save/load** | Uses name for workspace reference |
| **deploy/remove** | Accesses package via workspace reference |

## Example
```bash
# Creates package with name "myapp"
./spl spl/package/create -r apps -d myapp -f myapp.json

# Workspace reference: spl/package.myapp
# headers.spl.package.name = "myapp.json"
```

---

[← Home](../README.md)