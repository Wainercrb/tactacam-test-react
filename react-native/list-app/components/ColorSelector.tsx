import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import WheelPicker from "react-native-wheel-color-picker";

const DEFAULT_COLOR = "#000000";

type TProps = {
  onColorChange: (color: string) => void;
};

const OrientationSelector: React.FC<TProps> = ({ onColorChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR);

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
    onColorChange(selectedColor);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenModal}>
        <View
          style={{ backgroundColor: selectedColor, ...styles.colorPreview }}
        />
      </TouchableOpacity>
      <Modal visible={isVisible} transparent={true}>
        <View style={styles.closeBtn}>
        <Button  onPress={handleClose} title="close" color="#841584" />

        </View>
        <View style={styles.modalContainer}>
          <WheelPicker onColorChange={setSelectedColor} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeBtn: {
    position: 'absolute',
    zIndex: 5,
    top: 12,
    right: 12,
    width: 120,
  }
});

export default OrientationSelector;
