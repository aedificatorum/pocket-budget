import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import { removeItem, getItemsForPeriod } from "../Store";
import { ticksToShortDate } from "../../Utils/dateUtils";
import PeriodPicker from "../DatePickers/PeriodPicker";
import { StyledTable, StyledButton } from "./Summary.styles";

const SummaryTable = ({ history, initialAccountId }) => {
  const goToEdit = id => {
    history.push(`/edit/${id}`);
  };

  const [items, setItems] = useState([]);
  const [ticks, setTicks] = useState({ fromTicks: null, toTicks: null });
  const [accountId, setAccountId] = useState(initialAccountId || null);

  const getItems = async (fromTicks, toTicks) => {
    const items = await getItemsForPeriod(fromTicks, toTicks);

    setItems(items);
  };

  useEffect(() => {
    // Only run the query when these have been set
    if (ticks.fromTicks && ticks.toTicks) {
      getItems(ticks.fromTicks, ticks.toTicks);
    }
  }, [ticks.fromTicks, ticks.toTicks]);

  const exportRows =
    items.length === 0
      ? null
      : items
          .sort((a, b) => b.dateTicks - a.dateTicks)
          .filter(item => {
            return !accountId || accountId === item.accountId;
          })
          .map(d => {
            return (
              <div key={d.id}>
                <MediaQuery minDeviceWidth={1224}>
                  <div>
                    <div>{ticksToShortDate(d.dateTicks)}</div>
                    <div>{ticksToShortDate(d.reportingDateTicks)}</div>
                    <div>{d.currency}</div>
                    <div>{d.location}</div>
                    <div>{d.category}</div>
                    <div>{d.subcategory}</div>
                    <div>{d.to}</div>
                    <div
                      style={{
                        textAlign: "right",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {d.amount}
                    </div>
                    <div>{d.details}</div>
                    <div>{d.project}</div>
                    <StyledButton>
                      <Link to={`/edit/${d.id}`}>Edit</Link>
                    </StyledButton>

                    <StyledButton
                      onClick={async () => {
                        if (window.confirm("Are you sure?")) {
                          await removeItem(d.id);
                          toast.error("Item removed! 💣");
                          setItems(items.filter(item => item.id !== d.id));
                        }
                      }}
                    >
                      Delete
                    </StyledButton>
                  </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={640}>
                  <div>
                    <div>{ticksToShortDate(d.dateTicks)}</div>
                    <div>{d.to}</div>
                    <div
                      style={{
                        textAlign: "right",
                      }}
                    >
                      {d.amount}
                    </div>
                    <button
                      onClick={e => {
                        goToEdit(d.id);
                      }}
                    >
                      ➞
                    </button>
                  </div>
                </MediaQuery>
              </div>
            );
          });

  return (
    <div
      style={{
        marginTop: ".5rem",
      }}
    >
      <PeriodPicker ticks={ticks} setTicks={setTicks} />
      <MediaQuery minDeviceWidth={1224}>
        <StyledTable>
          <div>
            <div>Date</div>
            <div>Reporting</div>
            <div>Currency</div>
            <div>Location</div>
            <div>Category</div>
            <div>Subcategory</div>
            <div>To</div>
            <div>Amount</div>
            <div>Details</div>
            <div>Project</div>
            <div></div>
            <div></div>
          </div>
          {exportRows ? exportRows : <div>Loading...</div>}
        </StyledTable>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={640}>
        <StyledTable>
          <div>
            <div>Date</div>
            <div>To</div>
            <div>Cost</div>
            <div></div>
          </div>
          {exportRows ? exportRows : <div>Loading...</div>}
        </StyledTable>
      </MediaQuery>
    </div>
  );
};

export default SummaryTable;
