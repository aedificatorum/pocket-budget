import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useHistory, useLocation } from "react-router-dom";
import MediaQuery from "react-responsive";
import { removeItem, getItemsForPeriod } from "../Store";
import { ticksToShortDate, ticksToFullDate } from "../../Utils/dateUtils";
import PeriodPicker from "../DatePickers/PeriodPicker";
import { StyledTable, StyledButton, StyledTableMobile } from "./Summary.styles";

const getSearchAccountId = searchParams => {
  const search = new URLSearchParams(searchParams);
  const parsedAccountId = search.get("accountId");
  return parsedAccountId || null;
};

const SummaryTable = () => {
  const history = useHistory();
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [ticks, setTicks] = useState({ fromTicks: null, toTicks: null });
  // TODO: Should be able to clear/set the filter
  const [accountId, setAccountId] = useState(getSearchAccountId(location.search));

  // We have one-way data flow where the URL Search Params are the source of truth for filtering
  useEffect(() => {
    const searchAccountId = getSearchAccountId(location.search);
    if (searchAccountId !== accountId) {
      setAccountId(searchAccountId);
    }
  }, [location.search, accountId]);

  const goToEdit = id => {
    history.push(`/edit/${id}`);
  };

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

  let previousDate = undefined;
  let displayDate = undefined;

  const exportRows =
    items.length === 0
      ? null
      : items
          .sort((a, b) => b.dateTicks - a.dateTicks)
          .filter(item => {
            return !accountId || accountId === item.accountId;
          })
          .map(d => {
            if (!previousDate) {
              displayDate = true;
              previousDate = d.dateTicks;
            } else if (previousDate !== d.dateTicks) {
              displayDate = true;
              previousDate = d.dateTicks;
            } else {
              displayDate = false;
            }

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
                  {displayDate === true && (
                    <div className="dateTitle">{ticksToFullDate(d.dateTicks)}</div>
                  )}
                  <div className="rowData">
                    <div>{d.to}</div>
                    <div>{d.amount}</div>
                    <div>
                      <button
                        onClick={e => {
                          goToEdit(d.id);
                        }}
                      >
                        ➞
                      </button>
                    </div>
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
        <StyledTableMobile>
          <div>{/* <div>To</div>
            <div>Cost</div>
            <div></div> */}</div>
          {exportRows ? exportRows : <div>Loading...</div>}
        </StyledTableMobile>
      </MediaQuery>
    </div>
  );
};

export default SummaryTable;
