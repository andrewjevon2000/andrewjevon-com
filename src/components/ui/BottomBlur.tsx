/* Progressive blur di tepi bawah layar (seperti getstanley.ai):
   8 lapisan backdrop-filter yang makin kuat ke bawah, tiap lapisan dibatasi mask pita,
   jadi konten memudar jadi buram secara bertahap tanpa garis. Murni CSS, tanpa JS,
   pointer-events none. Dimatikan bila pengguna meminta transparansi dikurangi. */
export default function BottomBlur() {
  return (
    <div className="bottom-blur" aria-hidden>
      <i /><i /><i /><i /><i /><i /><i /><i />
    </div>
  );
}
