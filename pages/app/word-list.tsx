import { Button, Heading, IconButton } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { AppLayout } from "@layouts/AppLayout";
import { Page } from "@layouts/Page";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Word } from "@lib/types";
import { convertToCSV, downloadCSV } from "@lib/utils";
import { DeleteIcon } from "@chakra-ui/icons";
import useSWR, { mutate } from "swr";
import { META } from "@lib/constants";

type DataTableProps = {
  data: Word[];
};

const DataTable = ({ data }: DataTableProps) => {
  const columns = useMemo(
    () => [
      {
        Header: "Text",
        accessor: "text",
      },
      {
        Header: "Translation",
        accessor: "translation",
      },
    ],
    []
  );

  const deleteWord = (id: string) => async () => {
    await axios.delete(`/api/word-list/${id}`);
    mutate("/api/word-list");
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th w={5} />
          {columns.map((column) => (
            <Th key={column.accessor}>{column.Header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((d) => {
          return (
            <Tr key={d._id}>
              <Td>
                <IconButton
                  icon={<DeleteIcon w={4} h={4} />}
                  colorScheme="gray"
                  variant="outline"
                  onClick={deleteWord(d._id)}
                  aria-label=""
                ></IconButton>
              </Td>
              <Td>{d.text}</Td>
              <Td>{d.translation}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
const fetcher = (url: string) => axios(url).then(({ data: { data } }) => data);

export default function WordList() {
  const { data } = useSWR("/api/word-list", fetcher);

  const handleExport = () => {
    downloadCSV(convertToCSV(data));
  };

  return (
    <Page meta={META}>
      <AppLayout>
        <Heading>Word List</Heading>
        <Button onClick={handleExport}>Export to CSV</Button>
        {!data ? <Heading>Loading...</Heading> : <DataTable data={data} />}
      </AppLayout>
    </Page>
  );
}
