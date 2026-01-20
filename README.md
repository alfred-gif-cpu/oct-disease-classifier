# 🔬 AI OCT Disease Classifier

AI-powered retinal disease detection system using hybrid deep learning architecture for automated diagnosis of OCT scans.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange.svg)
![Flask](https://img.shields.io/badge/Flask-2.x-green.svg)

## 🎯 Features

- **94% Accuracy** on OCT disease classification
- **4 Disease Classes**: CNV, DME, DRUSEN, NORMAL
- **Hybrid Architecture**: GLCM texture features + EfficientNetB0 deep learning
- **Dynamic Severity Assessment** based on image features
- **Interactive Web Interface** with real-time predictions
- **Medical Insights** including symptoms, treatments, and prognosis

## 🏗️ Architecture

- **Feature Extraction**: 
  - 6 GLCM texture features (Contrast, Energy, Correlation, Homogeneity, Entropy, Variance)
  - 1280 EfficientNetB0 deep features (ImageNet pretrained)
- **Preprocessing**: CLAHE enhancement
- **Model**: Hybrid neural network with attention mechanisms
- **Training**: 20,000 images with 3x augmentation

## 📊 Performance

| Metric | Score |
|--------|-------|
| **Overall Accuracy** | 94% |
| **CNV Accuracy** | 96% |
| **DME Accuracy** | 94% |
| **DRUSEN Accuracy** | 92% |
| **NORMAL Accuracy** | 97% |

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- 8GB RAM minimum
- GPU optional (for training)

### Installation

1. **Clone the repository**
git clone https://github.com/Gowtham-PL/oct-disease-classifier.git
cd oct-disease-classifier



2. **Create virtual environment**
python -m venv venv

Windows
venv\Scripts\activate

Linux/Mac
source venv/bin/activate



3. **Install dependencies**
pip install -r requirements.txt



4. **Download trained models**

See [models/README.md](models/README.md) for download instructions.

Place downloaded files in the `models/` folder.

### Run the Application

python app.py



Open your browser and navigate to: [**http://localhost:5000**](http://localhost:5000)

## 📁 Project Structure

oct-disease-classifier/
├── app.py # Flask web application
├── templates/
│ └── index.html # Frontend interface
├── static/
│ └── uploads/ # User uploaded images
├── models/ # Trained models (download separately)
│ ├── oct_hybrid_optimized_final.h5
│ ├── effnet_feature_extractor.h5
│ ├── scaler_glcm.pkl
│ ├── scaler_effnet.pkl
│ └── label_encoder.pkl
├── src/ # Training scripts
│ ├── train_hybrid_model.py
│ ├── preprocess.py
│ ├── features.py
│ └── augmentation.py
├── requirements.txt
└── README.md



## 📖 Dataset

- **Source**: Kermany et al. OCT2017 Dataset
- **Size**: 84,495 retinal OCT images
- **Classes**: 4 (CNV, DME, DRUSEN, NORMAL)
- **Link**: [Mendeley Data](https://data.mendeley.com/datasets/rscbjbr9sj/2)

## 🔬 Technology Stack

### Backend
- Python 3.8+
- Flask 2.x
- TensorFlow 2.x
- Keras

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Libraries
- OpenCV - Image processing
- scikit-learn - Feature scaling
- NumPy - Numerical operations
- Pillow - Image handling

## 🧠 How It Works

1. **Image Upload**: User uploads OCT scan
2. **Preprocessing**: CLAHE enhancement applied
3. **Feature Extraction**: 
   - GLCM texture features computed
   - EfficientNet deep features extracted
4. **Prediction**: Hybrid model classifies disease
5. **Severity Assessment**: Dynamic analysis based on features
6. **Results Display**: Interactive visualization with medical insights

## 📊 Use Cases

- 🏥 Clinical decision support
- 🎓 Medical education and training
- 🔬 Research and development
- 📱 Telemedicine applications
- 🤖 Automated screening systems

## ⚠️ Important Disclaimer

**This is an educational project for research purposes only.**

This AI system should **NOT** be used as a replacement for professional medical diagnosis. Always consult qualified ophthalmologists and healthcare professionals for medical decisions.


## 👨‍💻 Author

**Gowtham PL**
- 🎓 B.Tech IT @ Rajalakshmi Engineering College (Graduating 2027)
- 📍 Chennai, India
- 🔗 GitHub: [@Gowtham-PL](https://github.com/Gowtham-PL)
- 💼 LinkedIn: [Gowtham Palaniappan](https://www.linkedin.com/in/gowtham-palaniappan-4b15a72a2)
- 📧 Email: gowthampalaniappan1881@gmail.com

## 🙏 Acknowledgments

- Dataset: Kermany et al., Mendeley Data
- EfficientNet: Tan & Le (Google Research)
- OCT Imaging Research Community
- OpenCV and TensorFlow contributors

## 📈 Future Enhancements

- [ ] Multi-stage severity classification
- [ ] 3D OCT volume analysis
- [ ] Integration with hospital PACS systems
- [ ] Mobile application (iOS/Android)
- [ ] Support for additional retinal diseases
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⭐ Star History

If you find this project useful, please consider giving it a star!

---

**Made with ❤️ for advancing healthcare AI**