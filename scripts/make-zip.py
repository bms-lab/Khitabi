import os
import zipfile

def create_project_zip():
    exclude_dirs = {
        'node_modules',
        '.git',
        'dist',
        '.aistudio',
        '__pycache__',
        '.vite',
    }
    exclude_files = {
        'khitabi.zip',
        '.DS_Store',
    }

    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    public_dir = os.path.join(project_root, 'public')
    os.makedirs(public_dir, exist_ok=True)
    
    zip_path_public = os.path.join(public_dir, 'khitabi.zip')
    zip_path_root = os.path.join(project_root, 'khitabi.zip')

    for target_zip in [zip_path_public, zip_path_root]:
        if os.path.exists(target_zip):
            os.remove(target_zip)

        with zipfile.ZipFile(target_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(project_root):
                # Filter dirs in-place to avoid descending into excluded folders
                dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.')]
                
                for file in files:
                    if file in exclude_files or file.endswith('.zip') or file.endswith('.pyc'):
                        continue
                    
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, project_root)
                    
                    # Also skip public/khitabi.zip itself
                    if rel_path == os.path.join('public', 'khitabi.zip'):
                        continue

                    zipf.write(full_path, rel_path)

        size_kb = os.path.getsize(target_zip) / 1024
        print(f"Created {target_zip} ({size_kb:.1f} KB)")

if __name__ == '__main__':
    create_project_zip()
