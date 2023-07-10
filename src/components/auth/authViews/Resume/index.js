import Context from "../../../../Context";
import { useContext } from "react";
import { Container, Row, Col, Table, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import Chart from 'chart.js/auto';

const Resume = () => {
  const { Request } = useContext(Context);
  const [data, setData] = useState(false);
  const [chartInstances, setChartInstances] = useState([]);

  useEffect(()=>{
    Request("get", "", {}, true).then((data)=>{
      if(data){
        setData(data.data);
      }
    })
  }, []);

  //Draw chats function
  useEffect(()=>{

    if(data){
      chartInstances.forEach(instance => {
        instance.destroy();
      });

      const newChartInstances = [];

      const chart_sales = new Chart(document.getElementById("drawChartSales"), {
        type: 'line',
        data: {
          labels: data.sales.map(month => month.month),
          datasets: [{
            label: "Número de vendas por mês",
            data: data.sales.map(sale => sale.sales)
          }]
        },
        options: {
          responsive: true
        }
      });

      newChartInstances.push(chart_sales);

      const chart_sales_totals = new Chart(document.getElementById("drawChartSalesValues"), {
        type: 'line',
        data: {
          labels: data.sales.map(month => month.month),
          datasets: [{
            label: "Valor total das vendas por mês",
            data: data.sales.map(sale => sale.total),
          }],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              ticks: {
                callback: (value) => (
                  new Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(parseInt(value) / 100)
                ),
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }).format(context.parsed.y / 100);
                  }
                  return label;
                },
              },
            },
          },
        },
      });      

      newChartInstances.push(chart_sales_totals);

      setChartInstances(newChartInstances);
    }
  },[data])

  return (
    <Container fluid>
       <Row className="pt-4">
        <Col>
          <h3>Resumo</h3>
        </Col>
      </Row>

      <Row>
        <Col>
          {data ? 
            <Row>
              <Row>
                <Col>
                  <canvas style={{height: '30%', width: 'auto', margin: "1rem"}} id="drawChartSales"></canvas>
                </Col>
              </Row>
              <Row>
                <Col>
                  <canvas style={{height: '30%', width: 'auto', margin: "1rem"}} id="drawChartSalesValues"></canvas>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2>Total de vendas nesse mês:</h2>
                  <h1>
                    {
                      new Intl.NumberFormat("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      }).format(parseInt(data.total_sales) / 100)
                    }
                  </h1>
                </Col>
                <Col>
                      {data.top_items ?
                        <Table>
                          <thead>
                            <tr>
                              <td colSpan={3}> Itens mais vendidos</td>
                            </tr>
                          </thead>
                          <tbody>
                            {data.top_items.length > 0 ?
                              data.top_items.map((item, i)=>(
                                <tr key={i}>
                                  <td>
                                    {item.id}
                                  </td>
                                  <td>
                                    {item.name}
                                  </td>
                                  <td>
                                    {
                                      new Intl.NumberFormat("pt-br", {
                                        style: "currency",
                                        currency: "BRL",
                                      }).format(parseInt(item.value) / 100)
                                    }
                                  </td>
                                </tr>
                              ))
                            :
                              <td colSpan={2}> Ainda não existem itens no ranking</td>
                            }
                          </tbody>
                        </Table>
                      :
                        <></>
                      }
                </Col>
              </Row>
            </Row>
          :
          <Spinner/>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default Resume;
