# How to Run the OCT Disease Classifier

A step-by-step guide to launching this app on this Windows machine.

---

## ✅ Quick Launch (do this every time)

The environment is **already set up**, so launching only takes one command.

1. Open the project in VS Code (or open **PowerShell** in the project folder).
2. In the terminal, make sure you're in the project folder:
   ```powershell
   cd "D:\OCT classifier"
   ```
3. Start the app with a single command:
   ```powershell
   venv\Scripts\python.exe app.py
   ```
4. Wait about **15–20 seconds** until you see:
   ```
   ✓ Models loaded successfully!
    * Running on http://127.0.0.1:5000
   ```
5. Open your browser to **http://localhost:5000**
   (or **Ctrl+Click** the link in the terminal).
6. Upload an OCT scan image — you get the prediction, severity, and medical info.

### To stop the app
Click inside the terminal and press **`Ctrl + C`**.

---

## 🖱️ Running from VS Code with the Run button (optional)

1. Open `app.py` in the editor.
2. Press **`Ctrl+Shift+P`** → type **"Python: Select Interpreter"** → choose the one
   that shows **`.\venv\Scripts\python.exe`** (labeled *venv*).
3. Open `app.py`, then press **F5** (pick "Python File" if asked), or click the
   green **▶** in the top-right corner.

> The one-line terminal command above is faster and more reliable — use that if
> the Run button gives you trouble.

---

## ⚠️ Common Problems

### "Unexpected token" / red errors after pasting commands
You pasted several lines at once and PowerShell glued them together.
**Fix:** run commands **one line at a time**, or just use the single launch
command: `venv\Scripts\python.exe app.py`

### "running scripts is disabled on this system"
Only happens if you try `venv\Scripts\activate`. You can avoid `activate`
entirely by using `venv\Scripts\python.exe app.py`. If you still want to enable
activation, run this once:
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### "Port 5000 is already in use"
An old copy is still running. Close the other terminal, or kill it:
```powershell
Get-Process python | Stop-Process -Force
```
Then launch again.

### The page won't load in the browser
Make sure the terminal still shows `Running on http://127.0.0.1:5000` and that
you didn't press `Ctrl + C`. The app must stay running while you use it.

---

## 🔧 First-Time Setup (only if the `venv` folder is ever deleted)

You should **not** need this — it's already done. But if the `venv` folder is
removed or you move to a fresh machine, rebuild it:

```powershell
cd "D:\OCT classifier"
"C:\Users\alfre\AppData\Local\Programs\Python\Python311\python.exe" -m venv venv
venv\Scripts\python.exe -m pip install -r requirements.txt
venv\Scripts\python.exe -m pip install "tensorflow==2.16.1" "numpy==1.26.4"
```

**Notes:**
- Use **Python 3.11** (not 3.14 — it's too new for TensorFlow).
- The last line re-applies version fixes needed to load the trained models.
- The model files live in `models\`. If they're missing, download them from the
  Google Drive link in `models/README.md` and place all 5 files in `models\`.

Then launch normally with `venv\Scripts\python.exe app.py`.

---

## ☁️ Hosting it online (Hugging Face Spaces)

See `deploy_hf.py` and the deployment files (`Dockerfile`, `requirements-hf.txt`).
Short version:
```powershell
venv\Scripts\python.exe -m pip install huggingface_hub
$env:HF_TOKEN="hf_xxx"          # a WRITE token from huggingface.co/settings/tokens
$env:HF_SPACE_ID="your-username/oct-disease-classifier"
venv\Scripts\python.exe deploy_hf.py
```
