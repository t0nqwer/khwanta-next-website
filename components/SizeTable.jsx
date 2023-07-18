const SizeTable = ({ data, SizeList, Sizedata }) => {
  return (
    <table className="overflow-scroll ">
      <thead>
        <tr>
          {SizeList?.map((e) => {
            return (
              <th
                className="text-base font-semibold divide-y divide-dashed "
                id={e?.Size_ID}
                key={e?.Size_ID ? e?.Size_ID : "lo"}>
                {e?.Size_ID}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {Sizedata?.map((e, i) => (
          <tr key={e.Detail.Size_De_Name}>
            <td key={e.Detail.Size_De_ID} className="w-24 text-sm font-semibold text-center ">
              {e.Detail.Size_De_Name}
            </td>
            {data?.size?.map((p, i) => {
              return p?.Size_De_Info?.map((g) => {
                if (g.Detail.Size_De_ID === e.Detail.Size_De_ID) {
                  return (
                    <td key={g.Info} className="w-24 text-base text-center ">
                      {g.Info}
                    </td>
                  );
                }
              });
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SizeTable;
