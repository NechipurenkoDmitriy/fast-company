{
  /* <tr>
            <td>Mark</td>
            <td>
              <span className="badge bg-success">Жопа</span>
            </td>
            <td>Повар</td>
            <td>500</td>
            <td>3.2/5</td>
            <td>
              <button className="badge bg-danger">Delete</button>
            </td>
          </tr> */
}

const renderUserRow = (user) => {
  return usersThead.map((column) =>
    column.key !== 'deleteKey' ? (
      <th scope="col" key={user[column.key]}>
        {user[column.key]}
      </th>
    ) : (
      <td key={column.key}>
        <button className="badge bg-danger">Delete</button>
      </td>
    )
  );
};
