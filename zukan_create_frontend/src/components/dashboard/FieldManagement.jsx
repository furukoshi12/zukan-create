import React, { useState } from 'react';
import client from '../../lib/api/client';
import AdminSidebar from './AdminSidebar';
import Fields from '../modal/Fields';

const FieldManagement = () => {
  const [label, setLabel] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [color, setColor] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [borderStyle, setBorderStyle] = useState('');
  const [borderRadius, setBorderRadius] = useState('');
  const [fontFamily, setFontFamily] = useState('');
  const [fontSize, setFontSize] = useState('');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };
  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const handleBorderColorChange = (e) => {
    setBorderColor(e.target.value);
  };
  const handleBorderStyleChange = (e) => {
    setBorderStyle(e.target.value);
  };
  const handleBorderRadiusChange = (e) => {
    setBorderRadius(e.target.value);
  };
  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const generateParams = {
    label: label,
    backgroundColor: backgroundColor,
    color: color,
    borderColor: borderColor,
    borderStyle: borderStyle,
    borderRadius: borderRadius,
    fontFamily: fontFamily,
    fontSize: fontSize
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = client.post('/field_designs', generateParams);
      console.log(response)
      setLabel("");
      setBackgroundColor("");
      setColor("");
      setBorderColor("");
      setBorderStyle("");
      setBorderRadius("");
      setFontFamily("");
      setFontSize("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminSidebar />
      <h2>Field Design Management</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">label:</label>
        <select id="label" value={label} onChange={handleLabelChange}>
          <option value=""></option>
          <option value="学名">学名</option>
          <option value="和名">和名</option>
          <option value="生態">生態</option>
        </select>

        <label htmlFor="title">background_color:</label>
        <select id="backgroundColor" value={backgroundColor} onChange={handleBackgroundColorChange}>
          <option value=""></option>
          <option value="background_#FECF8F">黄色</option>
          <option value="background_#94BCB7">青</option>
          <option value="background_#8AA3B9">ブルーグレー</option>
        </select>

        <label htmlFor="title">color:</label>
        <select id="color" value={color} onChange={handleColorChange}>
          <option value=""></option>
          <option value="#F69679">オレンジ</option>
          <option value="#9FCA99">緑</option>
          <option value="#8490C8">紫</option>
        </select>

        <label htmlFor="title">border_color:</label>
        <select id="borderColor" value={borderColor} onChange={handleBorderColorChange}>
          <option value=""></option>
          <option value="#FECF8F">黄色</option>
          <option value="#94BCB7">青</option>
          <option value="#8AA3B9">ブルーグレー</option>
        </select>

        <label htmlFor="title">border_style:</label>
        <select id="borderStyle" value={borderStyle} onChange={handleBorderStyleChange}>
          <option value=""></option>
          <option value="solid">solid</option>
          <option value="groove">groove</option>
          <option value="dotted">dotted</option>
          <option value="dashed">dashed</option>
        </select>

        <label htmlFor="title">border_radius:</label>
        <select id="borderRadius" value={borderRadius} onChange={handleBorderRadiusChange}>
          <option value=""></option>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <label htmlFor="title">font_family:</label>
        <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange}>
          <option value=""></option>
          <option value="serif">serif</option>
          <option value="sansSerif">sansSerif</option>
          <option value="monospace">monospace</option>
        </select>

        <label htmlFor="title">font_size:</label>
        <select id="fontSize" value={fontSize} onChange={handleFontSizeChange}>
          <option value=""></option>
          <option value="12">12</option>
          <option value="16">16</option>
          <option value="23">23</option>
        </select>

        <button type="submit">Create Field</button>
      </form>

      <Fields />
    </div>
  );
};

export default FieldManagement;
