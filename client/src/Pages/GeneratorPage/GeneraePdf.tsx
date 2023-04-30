import { useState } from 'react';
import { Document, Page, Text, Image, StyleSheet } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import { pdf } from '@react-pdf/renderer';

function GeneratePdf() {
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(event: any) {
    setInputValue(event.target.value);
  }

  async function generatePdf() {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = inputValue;
    let inputImage;
    try {
      inputImage = await html2canvas(input);
    } catch (error) {
      console.error("!!",error)
      return;
    }
    const inputImageUrl = inputImage.toDataURL('image/png');

    const styles = StyleSheet.create({
      page: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        paddingTop: 35,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 65,
      },
      image: {
        width: '100%',
        marginBottom: 20,
      },
      input: {
        marginBottom: 20,
      },
    });

    const pdfBlob = await pdf(
      <Document>
        <Page style={styles.page}>
          <Image src={inputImageUrl} style={styles.image} />
          <Text style={styles.input}>{inputValue}</Text>
        </Page>
      </Document>
    ).toBlob();

    const url = URL.createObjectURL(pdfBlob);
    window.open(url, '_blank');
  }

  return (
    <div>
      <input id="myInput" value={inputValue} onChange={handleInputChange} />
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
}

export default GeneratePdf;
