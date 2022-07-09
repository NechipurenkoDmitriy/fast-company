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

// const renderUserRow = (user) => {
//   return usersThead.map((column) =>
//     column.key !== 'deleteKey' ? (
//       <th scope="col" key={user[column.key]}>
//         {user[column.key]}
//       </th>
//     ) : (
//       <td key={column.key}>
//         <button className="badge bg-danger">Delete</button>
//       </td>
//     )
//   );
// };

// if (column.key === 'deleteKey') {
//   return renderTh(
//     <button
//       className="btn btn-danger btn-sm"
//       onClick={() => handleDelete(user._id)}
//     >
//       Delete
//     </button>,
//     column.key
//   );
// }
// if (column.key === 'profession') {
//   return renderTh(user[column.key].name);
// }
// if (column.key === 'qualities') {
//   return renderTh(renderQualities(user), column.key);
// }
// if (column.key === 'rate') {
//   return renderTh(`${user[column.key]}/5`, column.key);
// }

//   const renderHTMLElement = (blockName, innerHTML, atributes = '') => {
//     // return <{blockName} {atributes}>
//     //   {innerHTML}
//     //   </{blockName}>
//     // `<${blockName} ${atributes}>
//     // ${innerHTML}
//     // </${blockName}>`;
//   };
