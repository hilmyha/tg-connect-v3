import { View, Text } from "react-native";
import React from "react";
import { color, global, tabUndangan } from "../constant";

type UndanganProps = {
  informasi: any;
};

export default function Undangan({ informasi }: UndanganProps) {
  return (
    <View style={{ gap: 8 }}>
      <View>
        <Text style={[global.text, { color: color.primary }]}>Kepada Yth.</Text>
        <Text style={[global.text, { color: color.primary }]}>
          Bpk/Ibu/Sdr Warga RT XX RW XX
        </Text>
      </View>
      <Text style={[global.text, { color: color.primary }]}>
        Perihal: {informasi?.subject}
      </Text>
      <Text style={[global.text, { color: color.primary }]}>
        Assalamualaikum Wr. Wb.
      </Text>
      <Text
        style={[global.text, { color: color.primary, textAlign: "justify" }]}
      >
        Alhamdulillahirabbilalamin kami panjatkan rasa syukur kehadirat Allah
        SWT, atas segala rahmat dan nikmat-Nya. Selanjutnya dalam rangka{" "}
        {informasi?.event}, kami mohon dengan hormat kehadiran Bapak/Ibu/Sdr
        pada:
      </Text>
      <View style={tabUndangan.container}>
        {/* Baris Hari/Tgl */}
        <View style={tabUndangan.row}>
          <Text style={[tabUndangan.label, { color: color.primary }]}>
            Hari/Tgl
          </Text>
          <Text style={[tabUndangan.separator, { color: color.primary }]}>
            :
          </Text>
          <Text style={[tabUndangan.value, { color: color.primary }]}>
            {
              // Format tanggal
              new Date(informasi?.date).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }
          </Text>
        </View>

        {/* Baris Waktu */}
        <View style={tabUndangan.row}>
          <Text style={[tabUndangan.label, { color: color.primary }]}>
            Waktu
          </Text>
          <Text style={[tabUndangan.separator, { color: color.primary }]}>
            :
          </Text>
          <Text style={[tabUndangan.value, { color: color.primary }]}>
            {
              // Format waktu
              new Date(informasi?.date).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }{" "}
            s/d Selesai
          </Text>
        </View>

        {/* Baris Tempat */}
        <View style={tabUndangan.row}>
          <Text style={[tabUndangan.label, { color: color.primary }]}>
            Tempat
          </Text>
          <Text style={[tabUndangan.separator, { color: color.primary }]}>
            :
          </Text>
          <Text style={[tabUndangan.value, { color: color.primary }]}>
            {informasi?.place}
          </Text>
        </View>

        {/* Baris Acara */}
        <View style={tabUndangan.row}>
          <Text style={[tabUndangan.label, { color: color.primary }]}>
            Acara
          </Text>
          <Text style={[tabUndangan.separator, { color: color.primary }]}>
            :
          </Text>
          <Text style={[tabUndangan.value, { color: color.primary }]}>
            {informasi?.event}
          </Text>
        </View>
      </View>
      <Text
        style={[global.text, { color: color.primary, textAlign: "justify" }]}
      >
        Demikian undangan kami, atas kehadirannya kami sampaikan terima kasih,
        semoga kehadiran Bapak/Ibu/Saudara senantiasa mendapat berkah dan
        balasan kebaikan. Amin Yaa Robbal Alamin.
      </Text>
      <Text style={[global.text, { color: color.primary }]}>
        Wassalamualaikum Wr. Wb.
      </Text>
    </View>
  );
}
