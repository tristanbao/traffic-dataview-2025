import pdfplumber
import sys

pdf_path = r"c:\He.zheng\insightdata\Traffic Data View\交通看·区域经济2025_0228B.hzcomments.pdf"

try:
    with pdfplumber.open(pdf_path) as pdf:
        print(f"总页数: {len(pdf.pages)}\n")
        print("="*80)
        
        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            print(f"\n--- 第 {i + 1} 页 ---\n")
            print(text)
            print("\n" + "="*80)
            
except Exception as e:
    print(f"错误: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

